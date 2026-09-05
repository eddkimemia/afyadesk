import Link from "next/link";
import { ArrowRight, Clock, MapPin, DollarSign, Users, GraduationCap, ShieldCheck, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careers } from "@/lib/careers";

export function HomeCareersSection() {
  const preview = careers.slice(0, 3);
  return (
    <section className="py-14 md:py-20 bg-[#F8FAFC] border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">Careers at AfyaDesk</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">Remote Healthcare Careers, Built for Kenya</h2>
            <p className="mt-3 text-[15px] leading-7 text-[#5B6B80]">
              Join Kenya&apos;s healthcare support platform connecting skilled professionals to hospitals, clinics and global
              health teams. <span className="font-semibold text-[#0B1F33]">Flexible remote work, transparent pay, real growth</span> — not gig work. Graduates of our{" "}
              <Link href="/course" className="text-[#0F8B8D] font-semibold hover:text-[#0B1F33]">
                Readiness Course
              </Link>{" "}
              are prioritised — but you can apply with or without it.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1F33] text-white font-semibold">
                <Users className="h-3.5 w-3.5" /> {careers.length} open roles
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6EEF6] text-[#0B1F33]">
                <Clock className="h-3.5 w-3.5" /> Full-time & Part-time
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] text-[#0F8B8D] font-semibold">
                <DollarSign className="h-3.5 w-3.5" /> $10 – $20 / hr • M-Pesa / Bank
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/careers">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View All Roles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/careers/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Course + Apply promo */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link
            href="/course"
            className="group rounded-[20px] bg-white border border-[#E6EEF6] p-5 flex gap-4 items-center hover:shadow-md hover:border-[#DDE8F5] transition"
          >
            <div className="h-12 w-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6 text-[#0B1F33]" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#0B1F33] text-sm">New to remote healthcare?</div>
              <div className="text-sm text-[#5B6B80] leading-5">20-module Readiness Course — certificate + prioritised shortlisting.</div>
            </div>
            <span className="hidden sm:inline-flex h-10 px-5 items-center rounded-full bg-[#0B1F33] text-white text-sm font-semibold group-hover:bg-black transition shrink-0">
              View Course
            </span>
          </Link>
          <Link
            href="/careers/apply"
            className="group rounded-[20px] bg-[#0B1F33] text-white p-5 flex gap-4 items-center hover:bg-[#132a44] transition border border-white/10"
          >
            <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">Ready to apply?</div>
              <div className="text-sm text-white/70 leading-5">One form for all roles. Attach course certificate if you have it.</div>
            </div>
            <span className="hidden sm:inline-flex h-10 px-5 items-center rounded-full bg-white text-[#0B1F33] text-sm font-semibold shrink-0">
              Apply
            </span>
          </Link>
        </div>

        {/* role preview */}
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {preview.map((r) => (
            <div key={r.slug} className="group rounded-[20px] bg-white border border-[#E6EEF6] p-6 hover:shadow-lg hover:border-[#DDE8F5] transition flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-[#0B1F33] leading-tight">{r.title}</h3>
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold bg-[#0F8B8D] text-white px-2.5 py-1 rounded-full">
                  <DollarSign className="h-3 w-3" /> {r.rate}
                </span>
              </div>
              <p className="text-xs text-[#5B6B80] mt-2 leading-5 line-clamp-2">{r.shortDesc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-[#0B1F33]">
                  <Clock className="h-3 w-3" /> {r.type}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-[#0B1F33]">
                  <MapPin className="h-3 w-3" /> {r.location}
                </span>
              </div>
              <p className="mt-3 text-xs text-[#8A9BB0]">{r.rateNote}</p>
              <div className="mt-4 flex gap-2">
                <Link href={`/careers/${r.slug}`} className="flex-1">
                  <Button variant="secondary" size="lg" className="w-full text-sm h-10">
                    Details
                  </Button>
                </Link>
                <Link href={`/careers/apply?role=${encodeURIComponent(r.title)}`} className="flex-1">
                  <Button size="lg" className="w-full text-sm h-10">
                    Apply
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl bg-white border border-[#E6EEF6] p-4">
          <p className="text-sm text-[#5B6B80] flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#0F8B8D]" /> {careers.length - preview.length} more roles on the careers page — including billing, patient support & admin.
          </p>
          <Link href="/careers" className="text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33] flex items-center gap-1 shrink-0">
            See all {careers.length} roles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
