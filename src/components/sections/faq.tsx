"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">FAQs</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">Common questions</h2>
            <p className="mt-3 text-[#5B6B80] leading-7">
              Everything you need to know about working with AfyaDesk. Can&apos;t find an answer?{" "}
              <a href="/contact" className="font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">
                Talk to our team
              </a>
              .
            </p>
            <div className="mt-6 rounded-2xl bg-[#EAF6FF] border border-[#E6EEF6] p-4 text-sm text-[#0B1F33]">
              <span className="font-semibold">Important:</span> AfyaDesk provides administrative and support services
              only. We do not provide diagnosis, prescribing, clinical decision-making or emergency medical care.
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl border border-[#E6EEF6] bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-[#0B1F33] text-sm leading-6">{f.q}</span>
                  <span
                    className={`h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition ${open === i ? "bg-[#0B1F33] text-white border-[#0B1F33]" : "bg-white border-[#E6EEF6]"}`}
                  >
                    <ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {open === i && <div className="px-5 pb-5 text-sm leading-6 text-[#5B6B80]">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
