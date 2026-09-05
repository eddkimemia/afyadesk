import Link from "next/link";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { CourseEnrollForm } from "@/components/forms/course-enroll-form";
import { course as staticCourse } from "@/lib/course";
import { prisma } from "@/lib/prisma";
import { Shield, Clock, Award, CreditCard, Check, Phone, Mail, ArrowRight } from "lucide-react";

async function getCourse() {
  try {
    const db = await prisma.course.findFirst({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
    if (db) return { ...staticCourse, title: db.title || staticCourse.title, price: db.price, coverImage: db.coverImage || staticCourse.coverImage, description: db.description || staticCourse.description };
  } catch {}
  return staticCourse;
}

export async function generateMetadata() {
  const course = await getCourse();
  return { title: `Enroll — ${course.title} — KSh ${course.price} | AfyaDesk` };
}

export default async function CourseEnrollPage() {
  const course = await getCourse();
  const priceLabel = `KSh ${course.price.toLocaleString()}`;

  return (
    <div>
      <BreadcrumbHero
        eyebrow={`Enroll • ${priceLabel} • M-Pesa STK Push`}
        title="Enroll in the Remote Medical Careers Course"
        description="Enter your details, receive an M-Pesa STK push on your phone, enter PIN — instant portal access. Graduates are prioritised for AfyaDesk opportunities."
        featuredImage={course.coverImage}
        breadcrumb={[
          { label: "Course", href: "/course" },
          { label: "Enroll", href: "/course/enroll" },
        ]}
        compact
      >
        <Link href="/course" className="inline-flex h-12 px-6 items-center rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-[#0B1F33]">
          View curriculum
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6 md:p-7 shadow-sm">
            <h2 className="font-bold text-[#0B1F33] text-lg">Enroll — {priceLabel}</h2>
            <p className="text-sm text-[#5B6B80]">One-time fee • Lifetime access • Certificate after 70% pass</p>
            <div className="mt-6">
              <CourseEnrollForm courseSlug={course.slug} priceLabel={priceLabel} />
            </div>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">How M-Pesa STK Push works</h3>
            <ol className="mt-3 space-y-3 text-sm text-[#172033]">
              <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold shrink-0">1</span><span><span className="font-semibold">Fill form & submit</span> — we create your enrollment and trigger STK push instantly.</span></li>
              <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold shrink-0">2</span><span><span className="font-bold">Check your phone</span> — M-Pesa prompt for <span className="font-bold">{priceLabel}</span> to <span className="font-mono bg-white border px-2 py-1 rounded-lg">AfyaDesk (Daraja STK)</span> appears. Enter PIN.</span></li>
              <li className="flex gap-3"><span className="h-7 w-7 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold shrink-0">3</span><span>We verify via Safaricom callback — portal unlocks automatically. No code to copy.</span></li>
            </ol>
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-white border border-[#E6EEF6] p-3 flex gap-2">
                <CreditCard className="h-4 w-4 text-[#0F8B8D] shrink-0" />
                <div><div className="font-semibold text-[#0B1F33]">M-Pesa STK</div><div className="text-[#5B6B80]">Daraja API</div></div>
              </div>
              <div className="rounded-xl bg-white border border-[#E6EEF6] p-3">
                <div className="font-semibold text-[#0B1F33]">Phone</div>
                <div className="text-[#5B6B80] font-mono text-xs">2547xx xxx xxx</div>
              </div>
              <div className="rounded-xl bg-white border border-[#E6EEF6] p-3">
                <div className="font-semibold text-[#0B1F33]">Amount</div>
                <div className="text-[#0F8B8D] font-bold">{priceLabel}</div>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#8A9BB0]">Mock mode auto-confirms in 12s when Daraja env not set. Live mode uses real Safaricom STK. Need help? <a href="mailto:hello@afyadesk.co.ke" className="underline">hello@afyadesk.co.ke</a> • +254 700 000 000</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2"><Award className="h-5 w-5 text-amber-300" /> Why enroll?</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" /> Prioritised for AfyaDesk shortlisting</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" /> 20 modules + capstone + mock interview</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" /> Certificate with verification link</li>
              <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" /> Lifetime access & alumni community</li>
            </ul>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <Clock className="h-4 w-4" /> {course.duration} • <Shield className="h-4 w-4" /> Secure & confidential
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">What happens next?</h4>
            <ol className="mt-3 space-y-2 text-sm text-[#5B6B80] list-decimal list-inside">
              <li>Verification within hours</li>
              <li>Portal access + welcome email</li>
              <li>Complete at your pace, earn certificate</li>
              <li>Apply at <Link href="/careers/apply" className="text-[#0F8B8D] font-semibold">/careers/apply</Link> — flagged as prioritised</li>
            </ol>
            <Link href="/careers/apply" className="mt-4 inline-flex w-full h-12 px-6 rounded-full bg-[#0F8B8D] text-white text-sm font-semibold items-center justify-center gap-1.5">
              After course: Apply <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
            <h4 className="font-semibold text-amber-900 text-sm">Questions?</h4>
            <div className="mt-2 space-y-1.5 text-sm text-amber-900">
              <a href="mailto:hello@afyadesk.co.ke" className="flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" /> hello@afyadesk.co.ke</a>
              <a href="tel:+254700000000" className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> +254 700 000 000</a>
            </div>
            <p className="mt-3 text-xs text-amber-800">Course does not guarantee employment; see full disclaimer on <Link href="/course" className="underline">course page</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
