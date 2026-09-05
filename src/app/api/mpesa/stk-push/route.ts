import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { course as staticCourse } from "@/lib/course";
import { stkPush, isLive } from "@/lib/mpesa";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  courseSlug: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

    const courseSlug = parsed.data.courseSlug || staticCourse.slug;
    const phone = parsed.data.phone;

    // find or create course + enrollment (demo fallback to file handled via catch)
    let course: any = null;
    let enrollment: any = null;
    let isDemoFile = false;

    try {
      course = await prisma.course.findUnique({ where: { slug: courseSlug } });
      if (!course) {
        course = await prisma.course.create({
          data: {
            slug: courseSlug,
            title: staticCourse.title,
            description: staticCourse.description,
            price: staticCourse.price,
            currency: "KES",
            duration: staticCourse.duration,
            coverImage: staticCourse.coverImage,
          },
        });
      }
      enrollment = await prisma.courseEnrollment.create({
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email.toLowerCase(),
          phone,
          courseId: course.id,
          amount: course.price,
          status: "PENDING",
          stkInitiatedAt: new Date(),
        },
      });
    } catch (dbErr: any) {
      const isDemo = dbErr?.code === "P1001" || dbErr?.name === "PrismaClientInitializationError" || dbErr?.message?.includes("Environment variable") || dbErr?.message?.includes("Can't reach") || dbErr?.message?.includes("Authentication failed");
      if (isDemo) {
        isDemoFile = true;
        const path = await import("path");
        const { mkdir, readFile, writeFile } = await import("fs/promises");
        const dir = path.join(process.cwd(), "data");
        await mkdir(dir, { recursive: true });
        const fp = path.join(dir, "enrollments-demo.json");
        let arr: any[] = [];
        try { arr = JSON.parse(await readFile(fp, "utf-8")); } catch {}
        // Reuse course price from static
        course = { id: "demo-course", price: staticCourse.price, title: staticCourse.title };
        enrollment = {
          id: "demo-" + Date.now(),
          fullName: parsed.data.fullName,
          email: parsed.data.email.toLowerCase(),
          phone,
          courseId: course.id,
          amount: course.price,
          status: "PENDING",
          checkoutRequestId: null,
          merchantRequestId: null,
          createdAt: new Date().toISOString(),
        };
        // will be updated after stk
        arr.unshift(enrollment);
        await writeFile(fp, JSON.stringify(arr, null, 2));
      } else throw dbErr;
    }

    if (!course || !enrollment) return NextResponse.json({ error: "Failed to create enrollment" }, { status: 500 });

    const amount = course.price;
    const accountRef = `AFYA-${enrollment.id.slice(-6).toUpperCase()}`;

    // initiate STK
    let stk: any;
    try {
      stk = await stkPush({
        phone,
        amount,
        accountReference: accountRef,
        transactionDesc: `AfyaDesk Course`,
      });
    } catch (e: any) {
      // if live fails, still return error but keep enrollment
      return NextResponse.json({ error: `STK push failed: ${e.message}`, enrollmentId: enrollment.id }, { status: 502 });
    }

    // Save checkout ids to enrollment
    try {
      if (!isDemoFile) {
        await prisma.courseEnrollment.update({
          where: { id: enrollment.id },
          data: {
            checkoutRequestId: stk.CheckoutRequestID,
            merchantRequestId: stk.MerchantRequestID,
            stkInitiatedAt: new Date(),
            amount,
          },
        });
      } else {
        const path = await import("path");
        const { readFile, writeFile } = await import("fs/promises");
        const fp = path.join(process.cwd(), "data", "enrollments-demo.json");
        const raw = await readFile(fp, "utf-8");
        const arr = JSON.parse(raw);
        const idx = arr.findIndex((x: any) => x.id === enrollment.id);
        if (idx !== -1) {
          arr[idx].checkoutRequestId = stk.CheckoutRequestID;
          arr[idx].merchantRequestId = stk.MerchantRequestID;
          arr[idx].stkInitiatedAt = new Date().toISOString();
          arr[idx].amount = amount;
          await writeFile(fp, JSON.stringify(arr, null, 2));
        }
        // mock auto-callback after 12s to simulate user entering PIN
        if (stk.mocked) {
          setTimeout(async () => {
            try {
              const { readFile: rf, writeFile: wf } = await import("fs/promises");
              const raw2 = await rf(fp, "utf-8");
              const arr2 = JSON.parse(raw2);
              const i = arr2.findIndex((x: any) => x.id === enrollment.id);
              if (i !== -1 && arr2[i].status === "PENDING") {
                arr2[i].status = "PAID";
                arr2[i].mpesaCode = `MOCK${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
                arr2[i].mpesaResultCode = 0;
                arr2[i].mpesaResultDesc = "Mock success - STK PIN entered";
                await wf(fp, JSON.stringify(arr2, null, 2));
              }
            } catch {}
          }, 12000);
        }
      }
    } catch {}

    return NextResponse.json({
      success: true,
      mocked: stk.mocked,
      isLive: isLive(),
      enrollmentId: enrollment.id,
      checkoutRequestId: stk.CheckoutRequestID,
      merchantRequestId: stk.MerchantRequestID,
      amount,
      message: stk.CustomerMessage,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "STK failed" }, { status: 500 });
  }
}
