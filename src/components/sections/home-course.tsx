import Image from "next/image";
import Link from "next/link";
import { Clock, Award, GraduationCap, BookOpen, Zap, Shield, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { course } from "@/lib/course";

export function HomeCourseSection() {
  const priceLabel = `KSh ${course.price.toLocaleString()}`;
  return (
    <section className="py-14 md:py-20 bg-white border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">AfyaDesk Course</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33] leading-[1.05]">
              {course.title}
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#5B6B80]">{course.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F8B8D] text-white text-xs font-semibold">
                <Award className="h-3.5 w-3.5" /> {course.duration.split("•")[0].trim()} • 20 Modules
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-[#0B1F33] text-xs font-bold">
                <Shield className="h-3.5 w-3.5" /> {priceLabel} • Certificate included
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6EEF6] text-xs font-medium text-[#0B1F33]">
                <Clock className="h-3.5 w-3.5 text-[#0F8B8D]" /> Self-paced + live Q&A
              </span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {course.benefits.slice(0, 3).map((b) => (
                <li key={b} className="flex gap-2.5 text-sm text-[#172033]">
                  <span className="h-5 w-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-2.5 text-sm text-amber-900">
              <GraduationCap className="h-5 w-5 shrink-0 text-amber-600" />
              <p>
                <span className="font-bold">{course.promise}</span> Graduates attach certificate at{" "}
                <Link href="/careers/apply" className="underline font-semibold">
                  /careers/apply
                </Link>{" "}
                and are flagged for prioritised shortlisting.
              </p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/course/enroll">
                <Button size="lg" className="w-full sm:w-auto">
                  Enroll for {priceLabel} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/course">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-[#8A9BB0]">
              <span className="inline-flex items-center gap-1">
                <Zap className="h-3 w-3 text-[#0F8B8D]" /> Lifetime access
              </span>
              <span className="h-3 w-px bg-[#E6EEF6]" />
              <span>{course.students}+ students • {course.rating}★ rating</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-6">
            <div className="relative rounded-[28px] overflow-hidden border border-[#E6EEF6] shadow-[0_20px_60px_rgba(11,31,51,0.12)] bg-[#F8FAFC]">
              <div className="relative h-[220px] md:h-[260px]">
                <Image src={course.coverImage} alt={course.title} fill className="object-cover" sizes="600px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-[#0B1F33]/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                  <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-[#0B1F33] flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#0F8B8D]" /> 20 Modules • Capstone • Mock Interview
                  </span>
                  <span className="bg-[#0B1F33] text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                    {course.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-5 grid gap-4 bg-white">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { k: "20", l: "Modules" },
                    { k: "60h", l: "Content" },
                    { k: "1:1", l: "Mock interview" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
                      <div className="text-lg font-bold text-[#0B1F33]">{s.k}</div>
                      <div className="text-xs text-[#5B6B80]">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-wide uppercase text-[#0F8B8D]">What you&apos;ll build</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {course.modules.slice(0, 6).map((m: any) => (
                      <span key={m.n} className="text-[11px] px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-[#172033]">
                        <span className="font-bold text-[#0F8B8D]">{m.n}</span> {m.title}
                      </span>
                    ))}
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#0B1F33] text-white">+ 14 more modules</span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#0B1F33] text-white p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">Ready to get prioritised?</div>
                    <div className="text-xs text-white/60">Enroll now → certificate → apply → shortlisted first</div>
                  </div>
                  <Link href="/course" className="hidden sm:inline-flex h-9 px-4 items-center rounded-full bg-white text-[#0B1F33] text-xs font-bold shrink-0">
                    Explore
                  </Link>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div className="hidden md:flex absolute -bottom-4 -left-4 rounded-2xl bg-white border border-[#E6EEF6] shadow-xl p-3 items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0F8B8D] flex items-center justify-center text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0B1F33]">Certificate • Verified</div>
                <div className="text-xs text-[#5B6B80]">Unique No. + verification page</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
