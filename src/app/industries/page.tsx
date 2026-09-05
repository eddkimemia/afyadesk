import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { industries } from "@/lib/data";
import { Building2, Stethoscope, FlaskConical, Pill, Video, Rocket, Heart, Shield } from "lucide-react";

const icons: any = [Building2, Stethoscope, FlaskConical, Pill, Video, Rocket, Heart, Shield];

export const metadata = { title: "Industries — Healthcare Organizations We Serve" };

export default function IndustriesPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Industries"
        title="Industries we serve"
        description="From private hospitals to health startups — AfyaDesk provides flexible, healthcare-aware virtual support tailored to your organization."
        breadcrumb={[{ label: "Industries", href: "/industries" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {industries.map((ind, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={ind.name} className="rounded-[20px] bg-white border border-[#E6EEF6] p-6 hover:shadow-md transition">
              <div className="h-10 w-10 rounded-xl bg-[#EAF6FF] border border-[#E6EEF6] flex items-center justify-center text-[#0F8B8D]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-[#0B1F33]">{ind.name}</h3>
              <p className="mt-1 text-sm text-[#5B6B80]">{ind.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[24px] bg-[#0B1F33] text-white p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">We adapt to your workflow</h3>
            <p className="text-sm text-white/70">EMR, phone, calendar, messaging — your tools, your policies.</p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
              Talk to AfyaDesk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
