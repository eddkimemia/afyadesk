import Link from "next/link";
import { Stethoscope, Phone, FileText, Receipt, HeartHandshake, Database, Video, ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, any> = {
  Stethoscope, Phone, FileText, Receipt, HeartHandshake, Database, Video,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-14 md:py-20 bg-[#F8FAFC] border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">Services</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">Healthcare support — done right</h2>
            <p className="mt-2 text-[#5B6B80] max-w-2xl">
              Non-clinical, administrative expertise across the full patient and practice workflow.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33] flex items-center gap-1">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = iconMap[s.icon] || Stethoscope;
            return (
              <div
                key={s.slug}
                className="group rounded-[20px] bg-white border border-[#E6EEF6] p-6 hover:shadow-lg hover:border-[#DCE8F5] transition-all flex flex-col"
              >
                <div className="h-11 w-11 rounded-2xl bg-[#0B1F33] text-white flex items-center justify-center group-hover:bg-[#0F8B8D] transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-[#0B1F33] text-[17px]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#5B6B80]">{s.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-xs text-[#172033] flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#0F8B8D] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
