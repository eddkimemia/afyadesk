import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkoutId = searchParams.get("checkoutRequestId");
  const enrollmentId = searchParams.get("enrollmentId");
  if (!checkoutId && !enrollmentId) return NextResponse.json({ error: "Provide checkoutRequestId or enrollmentId" }, { status: 400 });

  try {
    let enrollment: any = null;
    if (enrollmentId) {
      enrollment = await prisma.courseEnrollment.findUnique({ where: { id: enrollmentId } });
    } else if (checkoutId) {
      enrollment = await prisma.courseEnrollment.findFirst({ where: { checkoutRequestId: checkoutId } });
    }
    if (enrollment) {
      return NextResponse.json({
        status: enrollment.status,
        resultCode: enrollment.mpesaResultCode,
        resultDesc: enrollment.mpesaResultDesc,
        mpesaCode: enrollment.mpesaCode,
        amount: enrollment.amount,
        hasCompletedCourse: enrollment.hasCompletedCourse,
        certificateNo: enrollment.certificateNo,
      });
    }
  } catch {}

  // demo fallback
  try {
    const path = await import("path");
    const { readFile } = await import("fs/promises");
    const fp = path.join(process.cwd(), "data", "enrollments-demo.json");
    const raw = await readFile(fp, "utf-8");
    const arr = JSON.parse(raw);
    let found: any = null;
    if (enrollmentId) found = arr.find((x: any) => x.id === enrollmentId);
    else if (checkoutId) found = arr.find((x: any) => x.checkoutRequestId === checkoutId);
    if (found) {
      return NextResponse.json({
        status: found.status,
        resultCode: found.mpesaResultCode,
        resultDesc: found.mpesaResultDesc,
        mpesaCode: found.mpesaCode,
        amount: found.amount,
        hasCompletedCourse: found.hasCompletedCourse,
        certificateNo: found.certificateNo,
      });
    }
  } catch {}

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
