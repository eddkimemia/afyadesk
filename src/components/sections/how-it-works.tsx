export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Tell Us What You Need",
      desc: "Quick consultation — we map your workflow, challenges and staffing requirements.",
    },
    {
      n: "02",
      title: "We Match Your Assistant",
      desc: "We identify suitable Kenyan medical virtual assistant talent, vetted for healthcare.",
    },
    {
      n: "03",
      title: "Start Working",
      desc: "Your assistant integrates into your tools and begins supporting your team.",
    },
    {
      n: "04",
      title: "Scale When Needed",
      desc: "Increase or decrease support as your practice grows — flexible by design.",
    },
  ];
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">How it works</p>
          <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33]">From consult to coverage in days</h2>
        </div>

        <div className="mt-8 grid md:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-[20px] bg-[#0B1F33] text-white p-6 overflow-hidden">
              <div className="text-5xl font-bold opacity-10">{s.n}</div>
              <h3 className="mt-2 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{s.desc}</p>
              <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
