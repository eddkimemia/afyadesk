import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  fullName: z.string().min(2),
  organization: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  country: z.string().optional(),
  orgType: z.string().optional(),
  servicesRequired: z.string().optional(),
  numberOfStaff: z.string().optional(),
  message: z.string().optional(),
});

// POST /api/leads - create lead (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const data = parsed.data;

    // Try DB, fallback to success if DB unavailable (e.g. no DATABASE_URL in dev)
    try {
      const lead = await prisma.lead.create({
        data: {
          fullName: data.fullName,
          organization: data.organization || null,
          email: data.email,
          phone: data.phone || null,
          country: data.country || null,
          orgType: data.orgType || null,
          servicesRequired: data.servicesRequired || null,
          numberOfStaff: data.numberOfStaff || null,
          message: data.message || null,
          status: "NEW",
          source: "WEBSITE",
        },
      });
      // log activity
      try {
        await prisma.activityLog.create({
          data: { action: "LEAD_CREATED", entity: "Lead", entityId: lead.id, metadata: { email: data.email } as any },
        });
      } catch {}
      return NextResponse.json({ success: true, id: lead.id });
    } catch (dbErr: any) {
      console.warn("DB unavailable for leads, logging to console", dbErr?.message);
      // In demo mode without DB, still return success
      if (dbErr?.message?.includes("Environment variable") || dbErr?.code === "P1001" || dbErr?.name === "PrismaClientInitializationError") {
        console.log("LEAD (no DB):", data);
        return NextResponse.json({ success: true, id: "demo-" + Date.now() });
      }
      throw dbErr;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create lead" }, { status: 500 });
  }
}

// GET /api/leads - list leads (protected, check cookie via auth? For now check session via API)
// Simple protection: require ADMIN session via jose verify (reused in admin routes)
export async function GET(req: NextRequest) {
  // Allow with ?export param for CSV; auth check done in client via cookie but server enforces via token
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { verifyToken } = await import("@/lib/auth");
    const sess = await verifyToken(token);
    if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      where: { deletedAt: null },
      take: 200,
    });
    return NextResponse.json(leads);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
