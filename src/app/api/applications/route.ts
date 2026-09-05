import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { verifyToken } from "@/lib/auth";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  location: z.string().optional(),
  position: z.string().min(2),
  experience: z.string().optional(),
  message: z.string().optional(),
  resumeUrl: z.string().optional(),
  hasCompletedCourse: z.union([z.boolean(), z.string()]).optional().transform((v) => v === true || v === "true" || v === "on"),
  courseCertificateUrl: z
    .string()
    .optional()
    .transform((v) => (v && v.trim() === "" ? undefined : v?.trim()))
    .refine((v) => !v || /^https?:\/\/.+/i.test(v) || /^\/uploads\/.+/i.test(v), { message: "Certificate must be an uploaded file (/uploads/...) or https:// URL" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    const d = parsed.data;
    // enforce certificate file when course completed is checked
    if ((d as any).hasCompletedCourse && !(d as any).courseCertificateUrl) {
      return NextResponse.json({ error: "Course Certificate file is required when you've completed the course — please upload your PDF/JPG/PNG certificate." }, { status: 400 });
    }
    try {
      const app = await prisma.jobApplication.create({
        data: {
          fullName: d.fullName,
          email: d.email,
          phone: d.phone,
          location: d.location || null,
          position: d.position,
          experience: d.experience || null,
          message: d.message || null,
          resumeUrl: d.resumeUrl || null,
          hasCompletedCourse: (d as any).hasCompletedCourse || false,
          courseCertificateUrl: (d as any).courseCertificateUrl || null,
          status: "PENDING",
        },
      });
      return NextResponse.json({ success: true, id: app.id });
    } catch (dbErr: any) {
      console.warn("DB unavailable for applications", dbErr?.message);
      if (dbErr?.message?.includes("Environment variable") || dbErr?.code === "P1001" || dbErr?.name === "PrismaClientInitializationError") {
        console.log("APPLICATION (no DB):", d);
        return NextResponse.json({ success: true, id: "demo-" + Date.now() });
      }
      throw dbErr;
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const apps = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return NextResponse.json(apps);
}
