import { NextRequest, NextResponse } from "next/server";
import { getPortalSession } from "@/lib/portal";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { readDemoEnrollments, writeDemoEnrollments, isDbAuthError } from "@/lib/demo";

const schema = z.object({
  moduleNumber: z.string(),
  completed: z.boolean(),
});

// GET progress for current user
export async function GET() {
  const sess = await getPortalSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const progress = await prisma.enrollmentProgress.findMany({ where: { enrollmentId: sess.enrollmentId }, orderBy: { moduleNumber: "asc" } });
    return NextResponse.json(progress);
  } catch (e: any) {
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      const en = arr.find((x: any) => x.id === sess.enrollmentId);
      return NextResponse.json(Array.isArray(en?.progress) ? en.progress : []);
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sess = await getPortalSession();
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid" }, { status: 400 });

  const { moduleNumber, completed } = parsed.data;
  try {
    const upsert = await prisma.enrollmentProgress.upsert({
      where: { enrollmentId_moduleNumber: { enrollmentId: sess.enrollmentId, moduleNumber } },
      update: { completed, completedAt: completed ? new Date() : null },
      create: { enrollmentId: sess.enrollmentId, moduleNumber, completed, completedAt: completed ? new Date() : null },
    });
    return NextResponse.json(upsert);
  } catch (e: any) {
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      const idx = arr.findIndex((x: any) => x.id === sess.enrollmentId);
      if (idx === -1) return NextResponse.json({ error: "Enrollment not found (demo)" }, { status: 404 });
      const enrollment = arr[idx];
      if (!Array.isArray(enrollment.progress)) enrollment.progress = [];
      const pIdx = enrollment.progress.findIndex((p: any) => p.moduleNumber === moduleNumber);
      const now = new Date().toISOString();
      if (pIdx !== -1) {
        enrollment.progress[pIdx].completed = completed;
        enrollment.progress[pIdx].completedAt = completed ? now : null;
        enrollment.progress[pIdx].updatedAt = now;
      } else {
        enrollment.progress.push({ id: `prog-${Date.now()}`, enrollmentId: sess.enrollmentId, moduleNumber, completed, completedAt: completed ? now : null, createdAt: now, updatedAt: now });
      }
      enrollment.progress.sort((a: any, b: any) => a.moduleNumber.localeCompare(b.moduleNumber));
      await writeDemoEnrollments(arr);
      const updated = enrollment.progress.find((p: any) => p.moduleNumber === moduleNumber);
      return NextResponse.json(updated);
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
