import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(services);
  } catch {
    const { services } = await import("@/lib/data");
    return NextResponse.json(services);
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  try {
    const svc = await prisma.service.create({ data: body });
    return NextResponse.json(svc);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
