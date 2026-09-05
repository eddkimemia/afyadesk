import Image from "next/image";
import Link from "next/link";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { Button } from "@/components/ui/button";
import { course as staticCourse } from "@/lib/course";
import { prisma } from "@/lib/prisma";
import { Check, Clock, Award, Star, Users, Shield, Zap, BookOpen, Target, FileText, Briefcase, GraduationCap, Globe, Monitor, Lock } from "lucide-react";

async function getCourse() {
  try {
    const db = await prisma.course.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
    if (db) return { ...staticCourse, title: db.title || staticCourse.title, price: db.price, coverImage: db.coverImage || staticCourse.coverImage, description: db.description || staticCourse.description };
  } catch {}
  return staticCourse;
}

export default async function CoursePage() {
  const course = await getCourse();
  const priceLabel = `KSh ${course.price.toLocaleString()}`;
  return (
    <div>
      <BreadcrumbHero
        eyebrow={`Course • ${priceLabel} • Remote Medical Careers`}
        title={course.title}
        description={course.description}
        featuredImage={course.coverImage}
        breadcrumb={[{ label: "Course", href: "/course" }]}
      >
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="px-3 py-1.5 rounded-full bg-white text-[#0B1F33] font-bold">{course.subtitle}</span>
          <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20">{course.by}</span>
        </div>
        <div className="w-full" />
        <Link href="/course/enroll">
          <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">Enroll for {priceLabel} — Get Prioritised</Button>
        </Link>
        <Link href="/careers/apply" className="hidden sm:inline-flex h-12 px-6 items-center rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-[#0B1F33]">
          Apply without course
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* hero meta */}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0F8B8D] text-white font-semibold"><Award className="h-4 w-4" /> {course.duration}</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6EEF6]"><Star className="h-4 w-4 text-amber-500" /> {course.rating} • {course.students}+ students</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-[#0B1F33] font-bold"><Shield className="h-4 w-4" /> Prioritised for hiring</span>
          </div>

          <div className="relative h-64 md:h-80 rounded-[20px] overflow-hidden border border-[#E6EEF6]">
            <Image src={course.coverImage} alt={course.title} fill className="object-cover" sizes="800px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/60 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="bg-white px-4 py-2 rounded-full text-sm font-bold text-[#0B1F33] flex items-center gap-2"><Zap className="h-4 w-4 text-[#0F8B8D]" /> {priceLabel} • Lifetime • Certificate</span>
              <span className="bg-[#0B1F33] text-white px-4 py-2 rounded-full text-xs font-semibold">20 Modules • Capstone • Mock Interview</span>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
            <GraduationCap className="h-5 w-5 shrink-0 text-amber-600" />
            <p><span className="font-bold">{course.promise}</span> — {course.subtitle}. Graduates who attach certificate at <Link href="/careers/apply" className="underline font-semibold">/careers/apply</Link> are flagged <span className="font-mono text-xs bg-white border px-1.5 py-0.5 rounded">hasCompletedCourse</span> and shortlisted first.</p>
          </div>

          {/* objectives */}
          <section className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h2 className="font-bold text-[#0B1F33] text-lg flex items-center gap-2"><Target className="h-5 w-5 text-[#0F8B8D]" /> Course Objectives</h2>
            <p className="text-sm text-[#5B6B80]">By the end, learners should be able to:</p>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {course.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm text-[#172033]"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#0F8B8D] shrink-0" />{o}</li>
              ))}
            </ul>
          </section>

          {/* modules */}
          <section>
            <h2 className="font-bold text-[#0B1F33] text-xl flex items-center gap-2"><BookOpen className="h-5 w-5 text-[#0F8B8D]" /> 20 Modules — Full Curriculum</h2>
            <p className="text-sm text-[#5B6B80]">Healthcare knowledge + digital, communication & professional skills for remote work. All modules include practical assignments.</p>
            <div className="mt-4 space-y-3">
              {course.modules.map((m: any) => (
                <details key={m.n} className="group rounded-2xl bg-white border border-[#E6EEF6] open:shadow-md transition overflow-hidden" open={parseInt(m.n) <= 2}>
                  <summary className="list-none flex gap-4 p-5 cursor-pointer">
                    <span className="h-10 w-10 rounded-xl bg-[#0B1F33] text-white flex items-center justify-center font-bold text-sm shrink-0">{m.n}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0B1F33]">{m.title}</h3>
                      {m.intro && <p className="text-xs text-[#5B6B80] mt-1">{m.intro}</p>}
                    </div>
                    <span className="h-8 w-8 rounded-full border border-[#E6EEF6] bg-[#F8FAFC] flex items-center justify-center shrink-0 group-open:rotate-180 transition">⌄</span>
                  </summary>
                  <div className="px-5 pb-5 space-y-4">
                    {m.topics && (
                      <div>
                        <h4 className="text-xs font-bold tracking-wide uppercase text-[#0F8B8D]">Topics</h4>
                        <ul className="mt-2 grid sm:grid-cols-2 gap-1.5">
                          {m.topics.map((t: string) => (
                            <li key={t} className="text-xs text-[#172033] flex gap-1.5"><span className="text-[#0F8B8D]">•</span>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {m.roles && (
                      <div className="rounded-xl bg-[#EAF6FF] border border-[#E6EEF6] p-3">
                        <h4 className="text-xs font-bold text-[#0B1F33]">Remote Roles to Explore</h4>
                        <div className="mt-1 flex flex-wrap gap-1.5">{m.roles.map((r: string) => (<span key={r} className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#E6EEF6]">{r}</span>))}</div>
                      </div>
                    )}
                    {m.groups && (
                      <div className="space-y-2">
                        {m.groups.map((g: any) => (
                          <div key={g.label} className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
                            <div className="text-xs font-bold text-[#0B1F33]">{g.label}</div>
                            <div className="text-xs text-[#5B6B80] mt-1">{g.items.join(" • ")}</div>
                            {g.note && <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">{g.note}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    {m.skills && <div><h4 className="text-xs font-bold text-[#0F8B8D]">Skills</h4><p className="text-xs text-[#5B6B80] mt-1">{m.skills.join(" • ")}</p></div>}
                    {m.simulations && <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><h4 className="text-xs font-bold text-emerald-800">Practical Simulations</h4><p className="text-xs text-emerald-900 mt-1">{m.simulations.join(" • ")}</p></div>}
                    {m.roleplays && <div className="rounded-xl bg-amber-50 border border-amber-200 p-3"><h4 className="text-xs font-bold text-amber-800">Role Plays</h4><p className="text-xs text-amber-900 mt-1">{m.roleplays.join(" • ")}</p></div>}
                    {m.exercises && <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3"><h4 className="text-xs font-bold">Exercises</h4><p className="text-xs text-[#5B6B80] mt-1">{m.exercises.join(" • ")}</p></div>}
                    {m.assignment && <p className="text-xs bg-[#0B1F33] text-white rounded-xl px-3 py-2"><span className="font-bold">Assignment:</span> {m.assignment}</p>}
                    {m.exercise && <p className="text-xs bg-[#0B1F33] text-white rounded-xl px-3 py-2"><span className="font-bold">Exercise:</span> {m.exercise}</p>}
                    {m.assessments && <div className="rounded-xl bg-amber-50 border border-amber-200 p-3"><h4 className="text-xs font-bold text-amber-800">Career Readiness Assessment</h4><p className="text-xs text-amber-900 mt-1">{m.assessments.join(" • ")}</p><p className="text-xs text-amber-800 mt-2">{m.note}</p></div>}
                    {m.mindset && <div className="rounded-xl bg-[#0B1F33] text-white p-3 text-xs"><span className="opacity-60">Mindset shift:</span> <span className="line-through opacity-70">“{m.mindset.from}”</span> → <span className="font-semibold text-emerald-300">“{m.mindset.to}”</span></div>}
                    {m.principle && <p className="text-xs bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-3"><span className="font-bold">Principle:</span> {m.principle}</p>}
                    {m.kenya && <p className="text-xs bg-[#EAF6FF] border border-[#E6EEF6] rounded-xl p-3 text-[#0B1F33]">{m.kenya}</p>}
                    {m.kenyaPlan && <p className="text-xs bg-[#EAF6FF] border border-[#E6EEF6] rounded-xl p-3 text-[#0B1F33]">{m.kenyaPlan}</p>}
                    {m.formula && <p className="text-xs font-mono bg-[#0B1F33] text-emerald-300 rounded-xl px-3 py-2 text-center">{m.formula}</p>}
                    {m.mock && <p className="text-xs bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900"><span className="font-bold">Mock:</span> {m.mock}</p>}
                    {m.framework && <p className="text-xs bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900">{m.framework}</p>}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* capstone */}
          <section className="rounded-2xl bg-[#0B1F33] text-white p-6">
            <h2 className="font-bold text-lg flex items-center gap-2"><Briefcase className="h-5 w-5 text-amber-300" /> {course.capstone.title}</h2>
            <p className="text-sm text-white/70 mt-1">{course.capstone.scenario}</p>
            <ol className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              {course.capstone.tasks.map((t, i) => (
                <li key={t} className="flex gap-2"><span className="h-6 w-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs shrink-0">{i + 1}</span>{t}</li>
              ))}
            </ol>
            <p className="mt-4 text-xs bg-white/10 border border-white/15 rounded-xl p-3 text-white/80">{course.capstone.note}</p>
          </section>

          {/* assessment */}
          <section className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h2 className="font-bold text-[#0B1F33] flex items-center gap-2"><FileText className="h-5 w-5 text-[#0F8B8D]" /> Assessment Structure</h2>
            <div className="mt-4 grid md:grid-cols-5 gap-3 text-center">
              {[
                { k: course.assessment.continuous.weight, l: "Continuous", d: course.assessment.continuous.items.join(" • ") },
                { k: course.assessment.practical.weight, l: "Practical", d: course.assessment.practical.items.join(" • ") },
                { k: course.assessment.exam.weight, l: "Exam", d: course.assessment.exam.items.join(" • ") },
                { k: course.assessment.capstone.weight, l: "Capstone", d: course.assessment.capstone.label },
                { k: course.assessment.mock.weight, l: "Mock Interview", d: course.assessment.mock.label },
              ].map((a) => (
                <div key={a.l} className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
                  <div className="text-xl font-bold text-[#0B1F33]">{a.k}</div>
                  <div className="text-xs font-semibold text-[#0F8B8D]">{a.l}</div>
                  <div className="text-[11px] text-[#5B6B80] mt-1 leading-4">{a.d}</div>
                </div>
              ))}
            </div>
          </section>

          {/* completion & specializations */}
          <section className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33] flex items-center gap-2"><GraduationCap className="h-5 w-5 text-[#0F8B8D]" /> {course.completion.title}</h3>
              <p className="text-xs text-[#5B6B80] mt-1">{course.completion.areas.join(" • ")}</p>
              <p className="text-xs text-[#8A9BB0] mt-2">{course.completion.note}</p>
              <div className="mt-3 h-20 rounded-xl border-2 border-dashed border-[#E6EEF6] bg-[#F8FAFC] flex items-center justify-center text-xs text-[#8A9BB0]">Certificate Preview • Unique No. + Verification</div>
            </div>
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-semibold text-[#0B1F33]">Optional Specialization Tracks</h3>
              <p className="text-xs text-[#5B6B80]">After core, specialize in:</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {course.specializations.map((s) => (
                  <div key={s.code} className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-2.5">
                    <div className="text-[11px] font-bold text-[#0F8B8D]">{s.code}</div>
                    <div className="text-xs font-medium text-[#0B1F33]">{s.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-[#EAF6FF] border border-[#E6EEF6] p-6">
            <h3 className="font-bold text-[#0B1F33] flex items-center gap-2"><Globe className="h-5 w-5 text-[#0F8B8D]" /> AfyaDesk Career Pathway</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.pathway.map((p, i) => (
                <span key={p} className="inline-flex items-center gap-1.5">
                  <span className="h-8 w-8 rounded-full bg-[#0B1F33] text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-semibold text-[#0B1F33]">{p}</span>
                  {i < course.pathway.length - 1 && <span className="mx-1 text-[#0F8B8D]">→</span>}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#5B6B80]">Goal is not just a certificate — it’s to make you <span className="font-semibold">remote-employment ready</span>.</p>
          </section>

          <section className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-semibold text-[#0B1F33] flex items-center gap-2"><Monitor className="h-5 w-5 text-[#0F8B8D]" /> Student Portal</h3>
              <ul className="mt-3 grid grid-cols-2 gap-1.5 text-xs text-[#5B6B80]">
                {course.portalFeatures.map((f) => (<li key={f} className="flex gap-1.5"><span className="text-[#0F8B8D]">•</span>{f}</li>))}
              </ul>
              <Link href="/course/portal" className="mt-4 inline-flex text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">Open portal demo →</Link>
            </div>
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-semibold text-[#0B1F33]">AfyaDesk Talent Profile</h3>
              <p className="text-xs text-[#5B6B80]">Your remote healthcare portfolio after completion:</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {course.talentProfileFields.map((f) => (<span key={f} className="text-[11px] px-2 py-1 rounded-full bg-[#F8FAFC] border border-[#E6EEF6]">{f}</span>))}
              </div>
            </div>
          </section>

          <div className="rounded-2xl bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold">Course Promise</h3>
            <p className="mt-2 text-lg font-semibold text-amber-300">“{course.promise}”</p>
            <p className="text-sm text-white/70 mt-2">Practical skills, professional communication, digital healthcare workflows & job-search strategies for legitimate remote opportunities.</p>
          </div>

          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 flex gap-3 text-sm text-red-900">
            <Lock className="h-5 w-5 shrink-0" />
            <p><span className="font-bold">Important:</span> {course.disclaimer}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6 shadow-sm sticky top-[88px]">
            <h3 className="font-bold text-[#0B1F33] text-lg">Enroll — {priceLabel}</h3>
            <p className="text-sm text-[#5B6B80] leading-6">One-time fee, lifetime access, verifiable certificate. Admin-set price — shown only here and on enroll page.</p>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <span className="px-3 py-1.5 rounded-full bg-[#0F8B8D] text-white font-bold">{priceLabel}</span>
              <span className="text-xs text-[#5B6B80] flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
            </div>
            <Link href="/course/enroll" className="mt-5 block">
              <Button size="lg" className="w-full">Enroll Now — {priceLabel}</Button>
            </Link>
            <p className="mt-2 text-xs text-center text-[#8A9BB0]">Secure Daraja STK Push • Enter PIN on phone</p>
            <div className="mt-4 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3 text-xs text-[#5B6B80]">
              <div className="font-semibold text-[#0B1F33]">What happens after enroll?</div>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Tap Pay — STK push to your phone</li>
                <li>Enter M-Pesa PIN</li>
                <li>Instant portal access + certificate path</li>
              </ol>
            </div>
          </div>

          <div className="rounded-2xl bg-[#EAF6FF] border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">After you finish</h4>
            <ol className="mt-2 space-y-1.5 text-sm text-[#172033] list-decimal list-inside">
              <li>Get certificate (PDF + link)</li>
              <li>Apply at <Link href="/careers/apply" className="text-[#0F8B8D] font-semibold">/careers/apply</Link> — tick “I’ve completed the course”</li>
              <li>We prioritise & match faster</li>
            </ol>
            <Link href="/careers/apply" className="mt-4 block">
              <Button variant="secondary" size="lg" className="w-full">Go to Apply Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
