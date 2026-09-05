import Link from "next/link";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { careers } from "@/lib/careers";
import { ArrowRight, Clock, MapPin, DollarSign, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Careers — Remote Healthcare Jobs in Kenya | AfyaDesk" };

export default function CareersPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Careers at AfyaDesk"
        title="Remote Healthcare Careers, Built for Kenya"
        description="Join AfyaDesk — Kenya’s healthcare support platform connecting skilled professionals to hospitals, clinics and global health teams. Flexible remote work, transparent pay, real growth — not gig work."
        breadcrumb={[{ label: "Careers", href: "/careers" }]}
      >
        <Link href="/careers/apply">
          <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">Apply Now — All Roles</Button>
        </Link>
        <Link href="/course" className="inline-flex h-12 px-6 items-center rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white hover:bg-white hover:text-[#0B1F33] backdrop-blur">
          Explore Readiness Course
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* intro rewritten */}
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1F33]">Work that matters — from Kenya, for the world</h2>
          <p className="mt-3 text-[15px] leading-7 text-[#5B6B80]">
            AfyaDesk hires for <span className="font-semibold text-[#0B1F33]">real healthcare operations</span> — scheduling, patient support, documentation, billing and telehealth coordination. No clinical diagnosis, no prescribing, no independent medical decisions. You support licensed clinicians so they can focus on patients. If you’re reliable, detail-driven and great with people, you’ll fit right in.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#5B6B80]">
            All roles are <span className="font-medium text-[#0B1F33]">remote from Kenya</span> with international exposure. Graduates of our <Link href="/course" className="text-[#0F8B8D] font-semibold hover:text-[#0B1F33]">Readiness Course</Link> are prioritised — but you can apply with or without it.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1F33] text-white font-semibold"><Users className="h-3.5 w-3.5" /> Kenyan talent • Global clients</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6EEF6] text-[#0B1F33]"><Clock className="h-3.5 w-3.5" /> Full-time & Part-time</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] text-[#0F8B8D] font-semibold"><DollarSign className="h-3.5 w-3.5" /> $10 – $20 / hr • M-Pesa / Bank</span>
        </div>

        {/* course + apply */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link href="/course" className="group rounded-[20px] bg-white border border-[#E6EEF6] p-6 flex gap-4 items-center hover:shadow-md hover:border-[#DDE8F5] transition">
            <div className="h-12 w-12 rounded-xl bg-amber-400 flex items-center justify-center text-white font-bold shrink-0"><GraduationCap className="h-6 w-6 text-[#0B1F33]" /></div>
            <div className="flex-1">
              <div className="font-bold text-[#0B1F33]">New to remote healthcare?</div>
              <div className="text-sm text-[#5B6B80] leading-5">Take the 20-module Readiness Course — certificate + prioritised shortlisting.</div>
            </div>
            <span className="hidden sm:inline-flex h-10 px-5 items-center rounded-full bg-[#0B1F33] text-white text-sm font-semibold group-hover:bg-black transition">View Course</span>
          </Link>
          <Link href="/careers/apply" className="group rounded-[20px] bg-[#0B1F33] text-white p-6 flex gap-4 items-center hover:bg-[#132a44] transition border border-white/10">
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0"><ArrowRight className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="font-bold">Ready to apply?</div>
              <div className="text-sm text-white/70 leading-5">One form for all roles. Attach course certificate if you have it.</div>
            </div>
            <span className="hidden sm:inline-flex h-10 px-5 items-center rounded-full bg-white text-[#0B1F33] text-sm font-semibold">Apply</span>
          </Link>
        </div>

        <div className="mt-10 flex items-baseline justify-between gap-4">
          <h2 className="font-bold text-[#0B1F33] text-xl">Open roles — {careers.length}</h2>
          <p className="text-sm text-[#5B6B80] hidden md:block">Each role has a detailed page with pay, responsibilities & benefits</p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          {careers.map((r) => (
            <div
              key={r.slug}
              className="group rounded-[20px] bg-white border border-[#E6EEF6] p-6 hover:shadow-lg hover:border-[#DDE8F5] transition flex flex-col"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-[#0B1F33]">{r.title}</h3>
                  <p className="text-xs text-[#5B6B80] mt-1">{r.shortDesc}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold bg-[#0F8B8D] text-white px-2.5 py-1 rounded-full">
                  <DollarSign className="h-3 w-3" /> {r.rate}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-[#0B1F33]"><Clock className="h-3 w-3" /> {r.type}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-[#0B1F33]"><MapPin className="h-3 w-3" /> {r.location}</span>
                <span className="px-2.5 py-1 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] text-[#0B1F33] font-medium">{r.department}</span>
              </div>

              <p className="mt-3 text-xs text-[#8A9BB0]">{r.rateNote}</p>

              <div className="mt-5 flex gap-3">
                <Link href={`/careers/${r.slug}`} className="flex-1">
                  <Button variant="secondary" size="lg" className="w-full">View Details</Button>
                </Link>
                <Link href={`/careers/apply?role=${encodeURIComponent(r.title)}`} className="flex-1">
                  <Button size="lg" className="w-full">Apply <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">What great AfyaDesk talent have in common</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-[#5B6B80]">
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Flawless English & warm, professional communication</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Obsessed with accuracy and confidentiality</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Calm under pressure, kind with patients</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Self-driven — you ship without micromanagement</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Comfortable with EMRs, calendars, and remote tools</li>
              <li className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-2 shrink-0" />Based in Kenya with stable power & internet</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-[#0B1F33] text-white p-6 flex flex-col">
            <h4 className="font-bold">Transparent pay</h4>
            <p className="mt-2 text-sm text-white/70 leading-6">Hourly in USD, paid monthly via M-Pesa or bank. Reviewed after 3 months; shift and accuracy bonuses available. No fees to apply — ever.</p>
            <Link href="/careers/apply" className="mt-auto pt-4">
              <Button size="lg" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">Start Application</Button>
            </Link>
            <Link href="/course" className="mt-3 inline-flex justify-center text-xs font-semibold text-white/70 hover:text-white">or take the Readiness Course →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
