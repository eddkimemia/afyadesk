import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  courseId: z.string().optional(),
  moduleNumber: z.string().min(1),
  title: z.string().min(2),
  type: z.enum(["PDF", "PPTX", "VIDEO", "LINK"]),
  url: z.string().min(4),
  order: z.coerce.number().optional(),
});

// GET ?courseId=&moduleNumber=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const moduleNumber = searchParams.get("moduleNumber");

  try {
    const where: any = {};
    if (courseId) where.courseId = courseId;
    if (moduleNumber) where.moduleNumber = moduleNumber;

    // if no courseId, fallback to first active course
    if (!courseId) {
      const course = await prisma.course.findFirst({ where: { isActive: true } });
      if (course) where.courseId = course.id;
    }

    const materials = await prisma.courseMaterial.findMany({
      where,
      orderBy: [{ moduleNumber: "asc" }, { order: "asc" }, { createdAt: "asc" }],
    });
    return NextResponse.json(materials);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  try {
    let courseId = parsed.data.courseId;
    if (!courseId) {
      const course = await prisma.course.findFirst({ where: { isActive: true } });
      if (!course) return NextResponse.json({ error: "No active course" }, { status: 400 });
      courseId = course.id;
    }

    const mat = await prisma.courseMaterial.create({
      data: {
        courseId,
        moduleNumber: parsed.data.moduleNumber.padStart(2, "0"),
        title: parsed.data.title,
        type: parsed.data.type,
        url: parsed.data.url,
        order: parsed.data.order ?? 0,
      },
    });
    return NextResponse.json(mat);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
