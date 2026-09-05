import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { Check, ArrowRight, Shield } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};
  return { title: `${svc.title} | AfyaDesk`, description: svc.description };
}

export default async function ServiceDetail({ params }: Props) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <div>
      <BreadcrumbHero
        eyebrow="Service"
        title={svc.title}
        description={svc.description}
        featuredImage={svc.coverImage}
        breadcrumb={[
          { label: "Services", href: "/services" },
          { label: svc.title, href: `/services/${svc.slug}` },
        ]}
      >
        <Link href="/contact">
          <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
            Book a Free Consultation <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/contact" className="hidden sm:inline-flex h-12 px-6 items-center rounded-full border border-white/20 text-sm font-semibold hover:bg-white hover:text-[#0B1F33]">
          Request a Quote
        </Link>
      </BreadcrumbHero>

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* featured stack image row */}
          <div className="relative h-64 md:h-72 rounded-[20px] overflow-hidden border border-[#E6EEF6] mb-6">
            <Image src={svc.coverImage} alt={svc.title} fill className="object-cover" sizes="800px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/30 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-[#0B1F33] border border-white/20">
              {svc.title} • Non-clinical support
            </div>
          </div>

          <h2 className="font-bold text-[#0B1F33] text-xl">What we handle</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {svc.features.map((f) => (
              <li key={f} className="flex gap-3 rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-4 text-sm text-[#172033]">
                <span className="h-6 w-6 rounded-full bg-[#0F8B8D] text-white flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">How it works</h3>
            <ol className="mt-3 space-y-3 text-sm text-[#5B6B80] list-decimal list-inside">
              <li>We learn your workflow, tools (EMR, phone, calendar) and coverage needs.</li>
              <li>We match a trained medical support professional and onboard securely.</li>
              <li>Your assistant integrates and operates under your policies and supervision.</li>
              <li>We provide ongoing QA and you scale up or down as needed.</li>
            </ol>
          </div>

          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
            <Shield className="h-5 w-5 shrink-0" />
            <p>
              <span className="font-semibold">Non-clinical scope:</span> AfyaDesk assistants do not diagnose, prescribe,
              make clinical decisions, or provide emergency care. All clinical responsibility remains with your licensed professionals.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[20px] bg-[#0B1F33] text-white p-6">
            <h3 className="font-bold">Ready to get started?</h3>
            <p className="mt-2 text-sm text-white/70">Tell us your workload — we&apos;ll recommend part-time, full-time or a custom team.</p>
            <Link href="/contact" className="mt-4 block">
              <Button size="lg" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
                Request a Custom Quote
              </Button>
            </Link>
            <p className="mt-3 text-xs text-white/50">Avg match in 5–7 business days • No long-term lock-in</p>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Related services</h4>
            <ul className="mt-3 space-y-3">
              {related.map((r) => (
                <li key={r.slug} className="flex gap-3 items-center">
                  <span className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-[#E6EEF6]">
                    <Image src={r.coverImage} alt={r.title} fill className="object-cover" sizes="48px" />
                  </span>
                  <Link href={`/services/${r.slug}`} className="text-sm font-medium text-[#0F8B8D] hover:text-[#0B1F33]">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
