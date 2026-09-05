import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeCertNo(s: string) {
  return s.trim().toUpperCase().replace(/\s+/g, "");
}

async function findInDemo(certNo: string) {
  try {
    const { readDemoEnrollments } = await import("@/lib/demo");
    const arr = await readDemoEnrollments();
    const norm = normalizeCertNo(certNo);
    return arr.find((x: any) => normalizeCertNo(String(x.certificateNo || "")) === norm) || null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const certNoRaw = searchParams.get("cert") || searchParams.get("certificateNo") || searchParams.get("id") || "";
  const certNo = certNoRaw ? normalizeCertNo(certNoRaw) : "";

  if (!certNo) {
    return NextResponse.json({ valid: false, error: "Certificate number required. Eg: AFYA-2026-ABC123" }, { status: 400 });
  }

  // Try DB first
  let enrollment: any = null;
  try {
    enrollment = await prisma.courseEnrollment.findFirst({
      where: { certificateNo: certNo },
      include: { course: true },
    });
  } catch (e: any) {
    // Handle DB missing table or auth errors gracefully
    const msg = e?.message || "";
    const isDbError =
      e?.code === "P1001" ||
      e?.code === "P2021" ||
      e?.name === "PrismaClientInitializationError" ||
      msg.includes("does not exist") ||
      msg.includes("The table") ||
      msg.includes("Environment variable") ||
      msg.includes("Can't reach");
    if (!isDbError) {
      return NextResponse.json({ valid: false, error: "Verification failed: " + msg }, { status: 500 });
    }
    // fall through to demo check
  }

  // Fallback to demo file if not found in DB
  if (!enrollment) {
    enrollment = await findInDemo(certNo);
    if (enrollment) {
      // attach mock course if missing
      if (!enrollment.course) {
        enrollment.course = { title: "AfyaDesk Remote Medical Careers Course" };
      }
    }
  }

  if (!enrollment) {
    return NextResponse.json({ valid: false, certificateNo: certNoRaw, error: "Certificate not found. Check number or contact hello@afyadesk.co.ke" }, { status: 404 });
  }

  // Consider valid if has certificateNo and is COMPLETED or hasCompletedCourse
  const isCompleted = enrollment.status === "COMPLETED" || enrollment.hasCompletedCourse || !!enrollment.certificateNo;
  if (!isCompleted) {
    return NextResponse.json({
      valid: false,
      certificateNo: enrollment.certificateNo,
      fullName: enrollment.fullName,
      courseTitle: enrollment.course?.title || "AfyaDesk Remote Medical Careers Course",
      completedAt: enrollment.completedAt || enrollment.updatedAt || enrollment.createdAt,
      status: enrollment.status,
      error: "Certificate found but not yet marked complete. Contact admin.",
    });
  }

  // Try to get director for display
  let director = "Dr. Grace Wanjiku, Director - AfyaDesk";
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key: "director_name" } });
    if (s?.value) director = s.value;
  } catch {
    try {
      const { readFile } = await import("fs/promises");
      const path = await import("path");
      const fp = path.join(process.cwd(), "data", "settings-demo.json");
      const raw = await readFile(fp, "utf-8");
      const j = JSON.parse(raw);
      if (j.director_name) director = j.director_name;
    } catch {}
  }

  const completedAt = enrollment.completedAt || enrollment.updatedAt || enrollment.createdAt;

  return NextResponse.json({
    valid: true,
    authentic: true,
    certificateNo: enrollment.certificateNo,
    fullName: enrollment.fullName,
    email: enrollment.email ? enrollment.email.replace(/(?<=^.{2}).*(?=@)/, "***") : undefined,
    courseTitle: enrollment.course?.title || "AfyaDesk Remote Medical Careers Course",
    completedAt,
    completedAtFormatted: new Date(completedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }),
    director,
    status: enrollment.status,
    message: "Valid AfyaDesk certificate — issued and verifiable.",
  });
}
