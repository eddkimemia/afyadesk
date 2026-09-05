import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return null;
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return null;
  return sess;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const svc = await prisma.service.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!svc) {
      // fallback to static data for demo (when DB empty)
      const { services } = await import("@/lib/data");
      const found = services.find((s) => s.slug === id);
      if (found) return NextResponse.json({ ...found, id: `static-${found.slug}` });
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(svc);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  try {
    const existing = await prisma.service.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!existing) {
      // if static fallback, create new instead of update
      const { services } = await import("@/lib/data");
      const isStatic = services.some((s) => s.slug === id);
      if (isStatic) {
        // create new with provided data
        const created = await prisma.service.create({ data: { slug: body.slug || id.replace("static-", ""), title: body.title, description: body.description || "", icon: body.icon, coverImage: body.coverImage, features: body.features || [], content: body.content, order: body.order ?? 0, isActive: body.isActive ?? true } });
        return NextResponse.json(created);
      }
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const updated = await prisma.service.update({ where: { id: existing.id }, data: body });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const existing = await prisma.service.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.id.startsWith("static-")) return NextResponse.json({ error: "Cannot delete static demo service. Create a DB copy first." }, { status: 400 });
    await prisma.service.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
