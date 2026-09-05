import { HeartPulse, Flag, SlidersHorizontal, PiggyBank, Cpu, BadgeCheck } from "lucide-react";

const items = [
  { icon: HeartPulse, title: "Healthcare-Focused", desc: "We understand healthcare workflows and the importance of professionalism and confidentiality." },
  { icon: Flag, title: "Kenyan Talent", desc: "Skilled Kenyan professionals with strong communication and administrative capabilities." },
  { icon: SlidersHorizontal, title: "Flexible", desc: "Choose part-time, full-time or scalable support to match your volume." },
  { icon: PiggyBank, title: "Cost Effective", desc: "Reduce administrative overhead without compromising service quality." },
  { icon: Cpu, title: "Human + Technology", desc: "Combine skilled people with modern digital workflows and automation." },
  { icon: BadgeCheck, title: "Reliable", desc: "Build a dependable remote healthcare support team that shows up every day." },
];

export function WhyAfyaDesk() {
  return (
    <section className="py-14 md:py-20 bg-[#F8FAFC] border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">Why AfyaDesk?</p>
          <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">Trust, expertise and efficiency — built in</h2>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="rounded-[20px] bg-white border border-[#E6EEF6] p-6">
              <div className="h-10 w-10 rounded-xl bg-[#EAF6FF] border border-[#E6EEF6] flex items-center justify-center text-[#0F8B8D]">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-[#0B1F33]">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#5B6B80]">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] bg-white border border-[#E6EEF6] p-6 grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E6EEF6]">
          {[
            { k: "Vetted talent", v: "Interviewed, tested and reference-checked" },
            { k: "Healthcare aware", v: "Familiar with clinical workflows & terminology" },
            { k: "Manager support", v: "Ongoing QA and performance check-ins" },
          ].map((r) => (
            <div key={r.k} className="pt-4 md:pt-0 md:px-6 first:px-0">
              <div className="text-sm font-semibold text-[#0B1F33]">{r.k}</div>
              <div className="text-sm text-[#5B6B80]">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
