import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return null;
  const sess = await verifyToken(token);
  if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) return null;
  return sess;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await requireAdmin(req);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        status: body.status,
        notes: body.notes,
        assignedTo: body.assignedTo,
      },
    });
    await prisma.activityLog.create({
      data: { action: "LEAD_UPDATED", entity: "Lead", entityId: id, userId: sess.id, metadata: body as any },
    });
    return NextResponse.json(lead);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await requireAdmin(req);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.lead.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
