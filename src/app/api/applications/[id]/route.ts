import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return null;
  const s = await verifyToken(token);
  if (!s || (s.role !== "ADMIN" && s.role !== "STAFF")) return null;
  return s;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const sess = await requireAdmin(req);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  try {
    const app = await prisma.jobApplication.update({
      where: { id },
      data: { status: body.status, notes: body.notes },
    });
    return NextResponse.json(app);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
