import Link from "next/link";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { CareerForm } from "@/components/forms/career-form";
import { Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Apply — Join AfyaDesk" };

async function getCoursePrice() {
  try {
    const c = await prisma.course.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
    if (c) return c.price;
  } catch {}
  return 1500;
}

export default async function CareersApplyPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams;
  const price = await getCoursePrice();
  const priceLabel = `KSh ${price.toLocaleString()}`;

  return (
    <div>
      <BreadcrumbHero
        eyebrow="Careers • Apply"
        title="Apply to Join AfyaDesk"
        description={`Choose any open role — or apply generally and we’ll match you. Applicants who’ve completed the ${priceLabel} readiness course are prioritised.`}
        breadcrumb={[
          { label: "Careers", href: "/careers" },
          { label: "Apply", href: "/careers/apply" },
        ]}
      >
        <Link href="/course">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-[#0B1F33] text-sm font-bold">
            <Award className="h-4 w-4" /> Do the {priceLabel} Course — Get Prioritised
          </span>
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 rounded-[20px] bg-white border border-[#E6EEF6] p-6 md:p-7 shadow-sm">
          <h2 className="font-bold text-[#0B1F33] text-lg">Application Form</h2>
          {role && <p className="mt-1 text-sm font-medium text-[#0F8B8D]">Applying for: {role} <span className="text-[#5B6B80] font-normal">— you can change below</span></p>}
          <p className="mt-2 text-sm text-[#5B6B80]">We review every application within 5 business days. Course graduates are reviewed first.</p>
          <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
            <span className="font-bold">Tip:</span> If you’ve completed the <Link href="/course" className="underline font-semibold">AfyaDesk Readiness Course ({priceLabel})</Link>, tick the box and upload your certificate file (PDF/JPG/PNG) — your application is flagged as prioritised.
          </div>
          <div className="mt-6">
            <CareerForm defaultPosition={role} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2"><Award className="h-5 w-5 text-amber-300" /> Stand out — do the course</h3>
            <p className="mt-2 text-sm text-white/70 leading-6">For <span className="font-bold text-white">{priceLabel}</span> — 20 modules, certificate, job simulation & prioritised shortlisting. Course graduates are reviewed first for every role.</p>
            <ul className="mt-3 space-y-1.5 text-sm text-white/80">
              <li>• 20 modules • Scheduling, EMR, confidentiality</li>
              <li>• Mock calls & QA scoring</li>
              <li>• Certificate + direct match upon pass</li>
            </ul>
            <Link href="/course" className="mt-4 block">
              <Button size="lg" className="w-full bg-amber-400 text-[#0B1F33] hover:bg-amber-300 border-0">View Course — {priceLabel} <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">How we prioritise</h4>
            <ol className="mt-3 space-y-2 text-sm text-[#5B6B80] list-decimal list-inside">
              <li>Applications with <span className="font-semibold text-[#0B1F33]">Course Completed</span> flag are sorted to top</li>
              <li>Review by department & client fit</li>
              <li>Shortlisted → interview → hire</li>
            </ol>
            <p className="mt-3 text-xs text-[#8A9BB0]">No guaranteed hiring — course improves readiness & significantly boosts chances, but final match depends on openings.</p>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-5">
            <h4 className="font-semibold text-[#0B1F33]">Need help?</h4>
            <p className="text-sm text-[#5B6B80]">hello@afyadesk.co.ke • +254 700 000 000</p>
            <Link href="/careers" className="mt-2 inline-flex text-sm font-semibold text-[#0F8B8D]">Browse roles →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
