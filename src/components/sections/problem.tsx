import { PhoneOff, MailWarning, CalendarX2, Files, Clock3, Wallet, UsersRound, Receipt } from "lucide-react";

const problems = [
  { icon: PhoneOff, title: "Missed calls", desc: "Patients can't get through — and go elsewhere." },
  { icon: MailWarning, title: "Unanswered messages", desc: "Inbox overload. Slow replies. Frustrated patients." },
  { icon: CalendarX2, title: "Appointment overload", desc: "Double-bookings, gaps and no-shows pile up." },
  { icon: Files, title: "Administrative backlog", desc: "Forms, filing and follow-ups never end." },
  { icon: Clock3, title: "Documentation workload", desc: "Doctors spend hours on notes, not patients." },
  { icon: Receipt, title: "Billing & claims delays", desc: "SHA / insurer paperwork slows cash flow." },
  { icon: UsersRound, title: "Staff shortages", desc: "Hard to hire reliable admin at a fair cost." },
  { icon: Wallet, title: "High admin costs", desc: "Large in-house teams strain the budget." },
];

export function ProblemSection() {
  return (
    <section className="py-14 md:py-20 bg-[#F8FAFC] border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">The Reality</p>
          <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33] leading-tight">
            Your Healthcare Team Shouldn&apos;t Be Buried in Administration
          </h2>
          <p className="mt-3 text-[#5B6B80] leading-7">
            Kenyan hospitals, clinics and practices lose time, revenue and patient trust to admin overload. Sound familiar?
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-white border border-[#E6EEF6] p-5 hover:shadow-md transition-shadow"
            >
              <div className="h-10 w-10 rounded-xl bg-[#EAF6FF] border border-[#E6EEF6] flex items-center justify-center text-[#0F8B8D]">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold text-[#0B1F33]">{p.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#5B6B80]">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] bg-[#0B1F33] text-white p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">AfyaDesk is the solution — without the overhead</h3>
            <p className="mt-1 text-sm text-white/70 max-w-xl">
              We match you with trained Kenyan medical support professionals who plug into your workflow from day one.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium shrink-0">
            <span className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">→</span>
            <span>You need support → We provide talent → Your practice runs better</span>
          </div>
        </div>
      </div>
    </section>
  );
}
