import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";

export const metadata = { title: "About AfyaDesk — Kenya's Healthcare Support Platform" };

export default function AboutPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="About AfyaDesk"
        title="We’re building Africa’s leading healthcare virtual support platform — from Kenya."
        description="AfyaDesk is a Kenyan healthcare-support technology company connecting healthcare organizations with skilled remote medical support professionals."
        breadcrumb={[{ label: "About", href: "/about" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold text-[#0B1F33]">Mission</h2>
          <p className="mt-2 text-[#5B6B80] leading-7">
            To make quality healthcare support more accessible, efficient and scalable through people and technology.
          </p>

          <h2 className="mt-8 text-xl font-bold text-[#0B1F33]">Vision</h2>
          <p className="mt-2 text-[#5B6B80] leading-7">To become Africa&apos;s leading healthcare virtual support platform.</p>

          <h2 className="mt-8 text-xl font-bold text-[#0B1F33]">Values</h2>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3">
            {[
              ["Trust", "Reliable, confidential, professional."],
              ["Humanity", "Empathetic patient & team support."],
              ["Excellence", "Healthcare-aware and detail-driven."],
              ["Security", "Privacy by design, least-privilege access."],
              ["Innovation", "People + modern workflows."],
              ["Kenyan Pride", "World-class talent, local roots."],
            ].map(([k, v]) => (
              <li key={k} className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-4">
                <div className="font-semibold text-[#0B1F33] text-sm">{k}</div>
                <div className="text-xs text-[#5B6B80]">{v}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="relative h-56 rounded-[20px] overflow-hidden border border-[#E6EEF6]">
            <Image
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=900&q=80"
              alt="AfyaDesk team"
              fill
              className="object-cover"
              sizes="600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/50 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-[#0B1F33]">
              Nairobi • Remote-first • Global reach
            </div>
          </div>

          <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
            <h3 className="font-bold text-[#0B1F33]">Why AfyaDesk was built</h3>
            <p className="mt-2 text-sm leading-6 text-[#5B6B80]">
              Healthcare teams across Kenya — and globally — are overwhelmed by administrative work: missed calls,
              appointment chaos, documentation backlogs, billing delays. Hiring in-house is costly and hard to scale.
              AfyaDesk solves this by providing trained Kenyan professionals who embed remotely into your workflow,
              under your supervision, with secure and professional operations.
            </p>
            <p className="mt-3 text-sm leading-6 text-[#5B6B80]">
              We are not a generic call centre. We are healthcare-focused, technology-driven and proudly Kenyan — positioning
              Kenyan talent as highly trained, cost-effective and reliable for the world.
            </p>
          </div>

          <div className="rounded-[20px] bg-[#EAF6FF] border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">At a glance</h4>
            <ul className="mt-3 space-y-2 text-sm text-[#172033]">
              <li>• Headquarters: Nairobi, Kenya</li>
              <li>• Serving: Kenya, East Africa, UK, USA, Australia & beyond</li>
              <li>• Focus: Non-clinical healthcare administration</li>
              <li>• Model: People + technology, flexible & scalable</li>
            </ul>
            <Link href="/contact" className="mt-4 inline-block">
              <Button size="lg">Work with AfyaDesk</Button>
            </Link>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <span className="font-semibold">Scope reminder:</span> AfyaDesk provides administrative and support services only — not diagnosis, prescribing, clinical decision-making or emergency care.
          </div>
        </div>
      </div>
    </div>
  );
}
