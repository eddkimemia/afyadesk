import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { Stethoscope, Phone, FileText, Receipt, HeartHandshake, Database, Video, ArrowRight } from "lucide-react";

const iconMap: any = { Stethoscope, Phone, FileText, Receipt, HeartHandshake, Database, Video };

export const metadata = { title: "Services — Medical Virtual Assistants & Healthcare Support" };

export default function ServicesPage() {
  return (
    <div>
      <BreadcrumbHero
        eyebrow="Services"
        title="Healthcare support services"
        description="Non-clinical, administrative support across scheduling, reception, documentation, billing, patient coordination, data and telehealth."
        breadcrumb={[{ label: "Services", href: "/services" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s) => {
          const Icon = iconMap[s.icon] || Stethoscope;
          return (
            <div key={s.slug} className="group rounded-[20px] bg-white border border-[#E6EEF6] overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="relative h-40 overflow-hidden">
                <Image src={s.coverImage} alt={s.title} fill className="object-cover group-hover:scale-[1.03] transition duration-500" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 h-9 w-9 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center text-[#0B1F33] shadow">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-semibold text-[#0B1F33] text-lg">{s.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-[#5B6B80]">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs flex gap-2 text-[#172033]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F8B8D] mt-1.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F8B8D]">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[24px] bg-[#EAF6FF] border border-[#E6EEF6] p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="font-bold text-[#0B1F33]">Not sure what you need?</h3>
            <p className="text-sm text-[#5B6B80]">Book a free consultation — we&apos;ll recommend the right support model.</p>
          </div>
          <Link href="/contact">
            <Button size="lg">Book a Free Consultation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
