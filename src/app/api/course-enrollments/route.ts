import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";
import { course as staticCourse } from "@/lib/course";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  courseSlug: z.string().optional(),
  mpesaCode: z.string().optional(),
});

async function demoFilePath() {
  const { mkdir } = await import("fs/promises");
  const path = await import("path");
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  return path.join(dir, "enrollments-demo.json");
}

async function readDemoEnrollments(): Promise<any[]> {
  try {
    const { readFile } = await import("fs/promises");
    const fp = await demoFilePath();
    const raw = await readFile(fp, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeDemoEnrollment(entry: any) {
  try {
    const { writeFile, readFile } = await import("fs/promises");
    const fp = await demoFilePath();
    let arr: any[] = [];
    try {
      const raw = await readFile(fp, "utf-8");
      arr = JSON.parse(raw);
    } catch {}
    arr.unshift(entry);
    await writeFile(fp, JSON.stringify(arr, null, 2));
  } catch (e) {
    console.warn("Failed to write demo enrollment", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

    const courseSlug = parsed.data.courseSlug || staticCourse.slug;

    // demo fallback if DB unavailable
    try {
      // find or create course
      let course = await prisma.course.findUnique({ where: { slug: courseSlug } });
      if (!course) {
        course = await prisma.course.create({
          data: {
            slug: courseSlug,
            title: staticCourse.title,
            description: staticCourse.description,
            price: staticCourse.price,
            currency: "KES",
            duration: staticCourse.duration,
            coverImage: staticCourse.coverImage,
          },
        });
      }

      const enrollment = await prisma.courseEnrollment.create({
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          courseId: course.id,
          mpesaCode: parsed.data.mpesaCode || null,
          amount: course.price,
          status: parsed.data.mpesaCode ? "PAID" : "PENDING",
        },
      });

      return NextResponse.json({ success: true, id: enrollment.id });
    } catch (dbErr: any) {
      console.warn("DB unavailable for enrollment", dbErr?.message);
      const isDemo =
        dbErr?.code === "P1001" ||
        dbErr?.code === "P2021" ||
        dbErr?.name === "PrismaClientInitializationError" ||
        dbErr?.name === "PrismaClientKnownRequestError" ||
        dbErr?.message?.includes("Environment variable") ||
        dbErr?.message?.includes("Can't reach") ||
        dbErr?.message?.includes("Authentication failed") ||
        dbErr?.message?.includes("does not exist in the current database") ||
        dbErr?.message?.includes("The table") ||
        dbErr?.message?.includes("public.Course");
      if (isDemo) {
        const demoEntry = {
          id: "demo-" + Date.now(),
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          courseId: "demo-course",
          course: { id: "demo-course", title: staticCourse.title, price: staticCourse.price },
          mpesaCode: parsed.data.mpesaCode || null,
          amount: staticCourse.price,
          status: parsed.data.mpesaCode ? "PAID" : "PENDING",
          hasCompletedCourse: false,
          certificateNo: null,
          progress: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          demo: true,
        };
        await writeDemoEnrollment(demoEntry);
        console.log("ENROLLMENT (demo file):", demoEntry.id);
        return NextResponse.json({ success: true, id: demoEntry.id, demo: true });
      }
      throw dbErr;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const list = await prisma.courseEnrollment.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { course: true, progress: true },
    });
    return NextResponse.json(list);
  } catch (e: any) {
    // Fallback to demo file if DB unavailable or table missing (Vercel DB not migrated)
    const isDemo =
      e?.code === "P1001" ||
      e?.code === "P2021" ||
      e?.name === "PrismaClientInitializationError" ||
      e?.name === "PrismaClientKnownRequestError" ||
      e?.message?.includes("Environment variable") ||
      e?.message?.includes("Can't reach") ||
      e?.message?.includes("Authentication failed") ||
      e?.message?.includes("does not exist") ||
      e?.message?.includes("The table");
    if (isDemo) {
      const demo = await readDemoEnrollments();
      return NextResponse.json(demo);
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
