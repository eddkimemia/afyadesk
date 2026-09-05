import { NextResponse } from "next/server";
import { getPortalSession } from "@/lib/portal";
import { prisma } from "@/lib/prisma";
import { readDemoEnrollments, isDbAuthError } from "@/lib/demo";

export async function GET() {
  const sess = await getPortalSession();
  if (!sess) return NextResponse.json({ authenticated: false }, { status: 401 });
  try {
    const enrollment = await prisma.courseEnrollment.findUnique({ where: { id: sess.enrollmentId }, include: { course: true } });
    if (!enrollment) return NextResponse.json({ authenticated: false }, { status: 401 });
    // also get progress
    const progress = await prisma.enrollmentProgress.findMany({ where: { enrollmentId: sess.enrollmentId } });
    return NextResponse.json({ authenticated: true, enrollment, progress, session: sess });
  } catch (e: any) {
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      const enrollment = arr.find((x: any) => x.id === sess.enrollmentId) || null;
      if (!enrollment) return NextResponse.json({ authenticated: false }, { status: 401 });
      const progress = Array.isArray(enrollment.progress) ? enrollment.progress : [];
      return NextResponse.json({ authenticated: true, enrollment, progress, session: sess });
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
