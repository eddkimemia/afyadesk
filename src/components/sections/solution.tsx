import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SolutionSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">The AfyaDesk Way</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33] leading-tight">
              A Medical Support Team Without the Overhead
            </h2>
            <p className="mt-3 text-[#5B6B80] leading-7">
              Get trained remote medical support without the cost and complexity of hiring a large in-house
              administrative team. Flexible, scalable, healthcare-focused.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "No recruitment headaches — we match and onboard",
                "Trained on healthcare workflows & confidentiality",
                "Works in your tools: EMR, phone, calendar, chat",
                "Part-time, full-time or custom team — scale anytime",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm text-[#172033]">
                  <span className="h-6 w-6 rounded-full bg-[#0F8B8D] text-white flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex gap-3">
              <Link href="/contact">
                <Button size="lg">
                  Build Your Healthcare Support Team <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[24px] border border-[#E6EEF6] bg-[#F8FAFC] p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { step: "01", title: "You need support", desc: "Tell us your workflow & gaps" },
                  { step: "02", title: "We provide talent", desc: "Trained Kenyan professionals matched" },
                  { step: "03", title: "Your practice runs better", desc: "Patients happier, team focused" },
                ].map((s, i) => (
                  <div key={s.step} className="relative">
                    <div className="mx-auto h-10 w-10 rounded-full bg-[#0B1F33] text-white flex items-center justify-center text-sm font-bold">
                      {s.step}
                    </div>
                    {i < 2 && (
                      <div className="hidden sm:block absolute top-5 left-[60%] w-[80%] h-px bg-[#E6EEF6]" />
                    )}
                    <div className="mt-3 text-sm font-semibold text-[#0B1F33]">{s.title}</div>
                    <div className="text-xs text-[#5B6B80] leading-tight mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white border border-[#E6EEF6] p-4">
                  <div className="text-xs text-[#5B6B80]">Before AfyaDesk</div>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="h-2 rounded-full bg-red-100" style={{ width: "90%" }} />
                    <div className="h-2 rounded-full bg-red-100" style={{ width: "70%" }} />
                    <div className="h-2 rounded-full bg-red-100" style={{ width: "55%" }} />
                  </div>
                  <div className="mt-2 text-xs font-medium text-red-600">Missed calls • Backlog • Delays</div>
                </div>
                <div className="rounded-2xl bg-[#0B1F33] text-white p-4">
                  <div className="text-xs text-white/60">With AfyaDesk</div>
                  <div className="mt-2 space-y-1.5">
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: "95%" }} />
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: "88%" }} />
                    <div className="h-2 rounded-full bg-emerald-400" style={{ width: "92%" }} />
                  </div>
                  <div className="mt-2 text-xs font-medium text-emerald-300">Covered • Organized • On time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
