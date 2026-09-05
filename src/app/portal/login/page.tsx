import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { PortalLoginForm } from "@/components/portal/login-form";
import Link from "next/link";

export const metadata = { title: "Portal Login — AfyaDesk" };

export default function PortalLoginPage() {
  return (
    <div>
      <BreadcrumbHero eyebrow="Student Portal" title="Portal Login" description="Enter your enrollment email & phone to access your course. Only paid/verified enrollments can enter." breadcrumb={[{ label: "Course", href: "/course" }, { label: "Portal Login", href: "/portal/login" }]} compact />
      <div className="mx-auto max-w-md px-6 py-8">
        <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6 shadow-sm">
          <h2 className="font-bold text-[#0B1F33]">Login to your portal</h2>
          <p className="text-sm text-[#5B6B80]">Use the same email & phone you enrolled with at /course/enroll.</p>
          <div className="mt-6">
            <PortalLoginForm nextUrl="/portal" />
          </div>
          <p className="mt-4 text-xs text-center text-[#8A9BB0]">Not enrolled? <Link href="/course/enroll" className="text-[#0F8B8D] font-semibold">Enroll for course →</Link></p>
        </div>
      </div>
    </div>
  );
}
