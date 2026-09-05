import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  let data: any = {};

  try {
    if (body.status) data.status = body.status;
    if (typeof body.hasCompletedCourse === "boolean") data.hasCompletedCourse = body.hasCompletedCourse;
    if (body.notes !== undefined) data.notes = body.notes;
    if (body.hasCompletedCourse === true || body.status === "COMPLETED") {
      data.hasCompletedCourse = true;
      data.completedAt = new Date();
      // generate certificateNo if missing
      try {
        const existing = await prisma.courseEnrollment.findUnique({ where: { id } });
        if (existing && !existing.certificateNo) {
          const certNo = `AFYA-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          data.certificateNo = certNo;
        }
      } catch {}
      if (body.status === "COMPLETED") data.status = "COMPLETED";
    }

    const updated = await prisma.courseEnrollment.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    const isDemo = id.startsWith("demo-") || e?.code === "P2025" || e?.message?.includes("Record to update does not exist");
    if (isDemo) {
      try {
        const path = await import("path");
        const { readFile, writeFile, mkdir } = await import("fs/promises");
        const dir = path.join(process.cwd(), "data");
        await mkdir(dir, { recursive: true });
        const fp = path.join(dir, "enrollments-demo.json");
        let arr: any[] = [];
        try {
          const raw = await readFile(fp, "utf-8");
          arr = JSON.parse(raw);
        } catch {}
        const idx = arr.findIndex((x: any) => x.id === id);
        if (idx === -1) return NextResponse.json({ error: "Not found (demo)" }, { status: 404 });
        const existing = arr[idx];
        if ((body.hasCompletedCourse === true || body.status === "COMPLETED") && !existing.certificateNo) {
          const certNo = `AFYA-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          body.certificateNo = certNo;
          (data as any).certificateNo = certNo;
        }
        arr[idx] = { ...existing, ...body, ...data, updatedAt: new Date().toISOString(), hasCompletedCourse: data.hasCompletedCourse ?? existing.hasCompletedCourse };
        await writeFile(fp, JSON.stringify(arr, null, 2));
        return NextResponse.json(arr[idx]);
      } catch (fe: any) {
        return NextResponse.json({ error: fe.message }, { status: 500 });
      }
    }
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
