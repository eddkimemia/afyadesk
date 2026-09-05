import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { careers } from "@/lib/careers";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { Check, Clock, MapPin, DollarSign, Briefcase, ArrowRight, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) return {};
  return { title: `${job.title} — ${job.rate} | AfyaDesk Careers`, description: job.shortDesc };
}

export default async function CareerDetail({ params }: Props) {
  const { slug } = await params;
  const job = careers.find((c) => c.slug === slug);
  if (!job) notFound();

  const related = careers.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div>
      <BreadcrumbHero
        eyebrow={job.department}
        title={job.title}
        description={job.shortDesc}
        featuredImage={job.coverImage}
        breadcrumb={[
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0B1F33] text-sm font-bold">
          <DollarSign className="h-4 w-4 text-[#0F8B8D]" /> {job.rate}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
          <Clock className="h-3.5 w-3.5" /> {job.type}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </span>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-56 md:h-72 rounded-[20px] overflow-hidden border border-[#E6EEF6]">
            <Image src={job.coverImage} alt={job.title} fill className="object-cover" sizes="800px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/45 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
              <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold text-[#0B1F33] flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" /> {job.department}
              </span>
              <span className="bg-[#0F8B8D] text-white px-3 py-1.5 rounded-full text-xs font-bold">{job.rate}</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h2 className="font-bold text-[#0B1F33]">About this role</h2>
            <p className="mt-2 text-sm leading-7 text-[#5B6B80]">{job.longDesc}</p>
            <p className="mt-3 text-xs font-semibold text-[#0F8B8D] bg-[#EAF6FF] border border-[#E6EEF6] inline-block px-2.5 py-1 rounded-full">{job.rateNote}</p>
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">Responsibilities</h3>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-[#172033]">
                  <span className="h-6 w-6 rounded-full bg-[#0F8B8D] text-white flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-semibold text-[#0B1F33]">Requirements</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#5B6B80] list-disc list-inside">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-6">
              <h3 className="font-semibold text-[#0B1F33]">Benefits</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#5B6B80] list-disc list-inside">
                {job.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl bg-white border border-[#E6EEF6] p-3 text-xs text-[#5B6B80]">
                <span className="font-semibold text-[#0B1F33]">Non-clinical only:</span> This role does not involve diagnosis, prescribing or clinical decision-making.
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
            <Award className="h-5 w-5 shrink-0 text-amber-600" />
            <p><span className="font-bold">Get prioritised:</span> Complete the <Link href="/course" className="underline font-semibold">AfyaDesk Readiness Course</Link> and attach your certificate when you apply — graduates are reviewed first.</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-teal-300" /> {job.rate}
            </h3>
            <p className="text-xs text-white/60 mt-1">{job.rateNote}</p>
            <p className="mt-3 text-sm text-white/70 leading-6">One application form for all roles. Choose this role on the next page — we reply within 5 business days.</p>
            <Link href={`/careers/apply?role=${encodeURIComponent(job.title)}`} className="mt-5 block">
              <Button size="lg" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">Apply for this role <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link href="/course" className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white">
              <Award className="h-3.5 w-3.5" /> Do course first — get prioritised
            </Link>
            <p className="mt-3 text-xs text-white/50 text-center flex items-center justify-center gap-1"><Shield className="h-3 w-3" /> Kenya • Remote • {job.type}</p>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">How to apply</h4>
            <ol className="mt-3 space-y-2 text-sm text-[#5B6B80] list-decimal list-inside">
              <li>Click <span className="font-semibold text-[#0B1F33]">Apply for this role</span> — you’ll go to <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E6EEF6] px-1.5 py-0.5 rounded">/careers/apply</span></li>
              <li>Select “{job.title}” (pre-filled) and complete the form</li>
              <li>Attach course certificate if you have it — you’ll be prioritised</li>
            </ol>
            <Link href={`/careers/apply?role=${encodeURIComponent(job.title)}`} className="mt-4 block">
              <Button variant="secondary" size="lg" className="w-full">Go to Application Form</Button>
            </Link>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Other roles</h4>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/careers/${r.slug}`} className="flex justify-between items-center p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] hover:bg-white">
                    <span className="text-sm font-medium text-[#0B1F33]">{r.title}</span>
                    <span className="text-xs font-bold text-[#0F8B8D]">{r.rate}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/careers" className="mt-3 inline-flex text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">
              View all careers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
