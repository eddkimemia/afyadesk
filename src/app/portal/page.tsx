import { redirect } from "next/navigation";
import { getPortalSession } from "@/lib/portal";
import { prisma } from "@/lib/prisma";
import { course as staticCourse } from "@/lib/course";
import { PortalDashboard } from "@/components/portal/dashboard";

export const metadata = { title: "Student Portal — AfyaDesk" };

export default async function PortalPage() {
  const sess = await getPortalSession();
  if (!sess) redirect("/portal/login");

  let enrollment: any = null;
  let course: any = null;
  let materials: any[] = [];
  let progress: any[] = [];

  try {
    enrollment = await prisma.courseEnrollment.findUnique({
      where: { id: sess.enrollmentId },
      include: { course: true },
    });
  } catch (e: any) {
    const { isDbAuthError, readDemoEnrollments } = await import("@/lib/demo");
    if (isDbAuthError(e)) {
      const arr = await readDemoEnrollments();
      enrollment = arr.find((x: any) => x.id === sess.enrollmentId) || null;
      if (enrollment && !enrollment.course) {
        // demo course fallback
        const { course: staticCourse } = await import("@/lib/course");
        enrollment.course = { id: enrollment.courseId, title: staticCourse.title, price: enrollment.amount || staticCourse.price, coverImage: staticCourse.coverImage, description: staticCourse.description };
      }
    } else throw e;
  }
  // demo fallback if not found but id starts with demo-
  if (!enrollment && sess.enrollmentId.startsWith("demo-")) {
    try {
      const { readDemoEnrollments } = await import("@/lib/demo");
      const arr = await readDemoEnrollments();
      enrollment = arr.find((x: any) => x.id === sess.enrollmentId) || null;
      if (enrollment && !enrollment.course) {
        const { course: staticCourse } = await import("@/lib/course");
        enrollment.course = { id: enrollment.courseId, title: staticCourse.title, price: enrollment.amount || staticCourse.price, coverImage: staticCourse.coverImage, description: staticCourse.description };
      }
    } catch {}
  }

  if (!enrollment) redirect("/portal/login");

  // check paid status
  if (enrollment.status === "PENDING" || enrollment.status === "REJECTED") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0B1F33]">{enrollment.status === "REJECTED" ? "Enrollment Rejected" : "Payment pending — STK Push"}</h1>
        <p className="mt-2 text-[#5B6B80]">Your enrollment is <span className="font-semibold">{enrollment.status}</span>. {enrollment.status === "PENDING" ? "Did you complete the M-Pesa STK push? Check your phone for the PIN prompt (Daraja). If you missed it, re-enroll or contact hello@afyadesk.co.ke" : "Contact hello@afyadesk.co.ke"}</p>
        <a href="/course/enroll" className="mt-4 inline-block h-12 px-6 rounded-full bg-[#0B1F33] text-white text-sm font-semibold items-center justify-center">{enrollment.status === "REJECTED" ? "Try Again →" : "Try STK again →"}</a>
      </div>
    );
  }

  course = enrollment.course;
  try {
    materials = await prisma.courseMaterial.findMany({
      where: { courseId: course.id },
      orderBy: [{ moduleNumber: "asc" }, { order: "asc" }],
    });
  } catch {
    try {
      const { readDemoEnrollments } = await import("@/lib/demo");
      // demo materials fallback: return empty for demo course
      materials = [];
    } catch { materials = []; }
  }

  try {
    progress = await prisma.enrollmentProgress.findMany({
      where: { enrollmentId: enrollment.id },
      orderBy: { moduleNumber: "asc" },
    });
  } catch {
    // demo fallback: progress stored inside enrollment
    progress = Array.isArray(enrollment.progress) ? enrollment.progress : [];
  }

  const courseForPortal = {
    ...staticCourse,
    title: course.title,
    price: course.price,
    coverImage: course.coverImage || staticCourse.coverImage,
    description: course.description,
  };

  return <PortalDashboard enrollment={enrollment} course={courseForPortal} materials={materials} progress={progress} />;
}
