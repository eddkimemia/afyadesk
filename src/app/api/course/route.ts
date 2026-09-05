import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { course as staticCourse } from "@/lib/course";

export async function GET() {
  try {
    const db = await prisma.course.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
    if (!db) {
      return NextResponse.json({ ...staticCourse, price: staticCourse.price, slug: staticCourse.slug });
    }
    return NextResponse.json(db);
  } catch {
    return NextResponse.json({ ...staticCourse });
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { price, title, description } = body;
  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  try {
    let course = await prisma.course.findFirst({ where: { isActive: true } });
    if (!course) {
      course = await prisma.course.create({
        data: {
          slug: staticCourse.slug,
          title: title || staticCourse.title,
          description: description || staticCourse.description,
          price: price ?? staticCourse.price,
          currency: "KES",
          duration: staticCourse.duration,
          coverImage: staticCourse.coverImage,
        },
      });
    } else {
      course = await prisma.course.update({
        where: { id: course.id },
        data: {
          ...(price !== undefined && { price }),
          ...(title && { title }),
          ...(description && { description }),
        },
      });
    }
    return NextResponse.json(course);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
