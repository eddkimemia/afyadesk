import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPortalSession } from "@/lib/portal";
import { z } from "zod";
import { findDemoEnrollmentByEmailPhone, isDbAuthError } from "@/lib/demo";

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const email = parsed.data.email.toLowerCase().trim();
    const phone = parsed.data.phone.replace(/\s/g, "");

    let enrollment: any = null;
    try {
      enrollment = await prisma.courseEnrollment.findFirst({
        where: {
          email: { equals: email, mode: "insensitive" },
        },
        orderBy: { createdAt: "desc" },
        include: { course: true },
      });
    } catch (e: any) {
      if (isDbAuthError(e)) {
        enrollment = await findDemoEnrollmentByEmailPhone(email, phone);
      } else throw e;
    }

    if (!enrollment) {
      return NextResponse.json({ error: "No enrollment found for this email. Please enroll first at /course/enroll" }, { status: 404 });
    }

    // check phone matches (allow last 9 digits)
    const clean = (s: string) => s.replace(/\D/g, "").slice(-9);
    if (clean(enrollment.phone) !== clean(phone)) {
      return NextResponse.json({ error: "Phone does not match enrollment record" }, { status: 401 });
    }

    if (enrollment.status === "PENDING") {
      return NextResponse.json({ error: "Payment not verified yet. M-Pesa STK Push pending or not completed. If you paid, wait ~30s for callback or contact hello@afyadesk.co.ke" }, { status: 403 });
    }
    if (enrollment.status === "REJECTED") {
      return NextResponse.json({ error: "Enrollment rejected. Contact support." }, { status: 403 });
    }

    // PAID, VERIFIED, COMPLETED allowed
    await createPortalSession({
      enrollmentId: enrollment.id,
      email: enrollment.email,
      fullName: enrollment.fullName,
      status: enrollment.status,
    });

    return NextResponse.json({ success: true, status: enrollment.status, fullName: enrollment.fullName });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Login failed" }, { status: 500 });
  }
}
