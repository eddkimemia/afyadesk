import Link from "next/link";
import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">Flexible Plans</p>
          <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">Plans that scale with you</h2>
          <p className="mt-2 text-[#5B6B80]">Tell us your workload and we&apos;ll recommend the right support model. No rigid pricing — custom quotes only.</p>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {pricingPlans.map((p) => (
            <div
              key={p.name}
              className={`rounded-[24px] border p-6 flex flex-col ${
                p.featured ? "bg-[#0B1F33] text-white border-[#0B1F33] shadow-xl" : "bg-white border-[#E6EEF6]"
              }`}
            >
              {p.featured && (
                <span className="self-start text-xs font-bold tracking-wide bg-white text-[#0B1F33] px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className={`mt-3 font-bold text-lg ${p.featured ? "text-white" : "text-[#0B1F33]"}`}>{p.name}</h3>
              <div className={`text-sm ${p.featured ? "text-white/60" : "text-[#5B6B80]"}`}>{p.hours}</div>
              <p className={`mt-2 text-sm leading-6 ${p.featured ? "text-white/70" : "text-[#5B6B80]"}`}>{p.description}</p>
              <ul className="mt-5 space-y-2.5 flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`flex gap-2 text-sm ${p.featured ? "text-white/90" : "text-[#172033]"}`}>
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${p.featured ? "bg-white/15 text-white" : "bg-[#EAF6FF] text-[#0F8B8D]"}`}>
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="mt-6">
                <Button
                  size="lg"
                  className={`w-full ${p.featured ? "bg-white text-[#0B1F33] hover:bg-[#F1F5F9]" : ""}`}
                  variant={p.featured ? "secondary" : "primary"}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#8A9BB0] mt-4">All plans include confidentiality training, workflow setup and ongoing QA.</p>
      </div>
    </section>
  );
}
