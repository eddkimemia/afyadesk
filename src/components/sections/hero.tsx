import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HERO_BG = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* medical background image with gradient overlay - lightened for image visibility */}
      <div className="absolute inset-0">
        <Image src={HERO_BG} alt="Kenyan medical professionals supporting healthcare remotely" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-white/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/30" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_0%_0%,rgba(15,139,141,0.04),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge className="bg-white shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for new clients
              </Badge>
              <Badge>Kenyan Talent • Healthcare-Focused • Remote • Scalable</Badge>
            </div>

            <h1 className="text-[32px] md:text-[44px] lg:text-[48px] font-bold tracking-tight leading-[1.05] text-[#0B1F33]">
              Scale Your Healthcare Practice With a{" "}
              <span className="text-[#0F8B8D]">Dedicated Medical Virtual Assistant</span>
            </h1>

            <p className="mt-5 text-[17px] leading-7 text-[#5B6B80] max-w-xl">
              Get trained, reliable medical virtual assistants who handle administrative work, patient support,
              scheduling, documentation and other non-clinical tasks — so your healthcare team can focus on patients.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/contact">
                <Button size="xl" className="w-full sm:w-auto">
                  Book a Free Consultation <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                  Explore Our Services
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-[#5B6B80]">
                <ShieldCheck className="h-4 w-4 text-[#0F8B8D]" /> No long-term lock-in
              </span>
              <span className="h-3 w-px bg-[#E6EEF6]" />
              <span className="flex items-center gap-1.5 text-[#5B6B80]">
                <Users className="h-4 w-4 text-[#0F8B8D]" /> Matched in 5–7 days
              </span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "500+", v: "Healthcare tasks / day" },
                { k: "98%", v: "Client retention" },
                { k: "40%", v: "Avg. admin time saved" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl bg-white border border-[#E6EEF6] p-3 shadow-sm">
                  <div className="text-lg font-bold text-[#0B1F33]">{s.k}</div>
                  <div className="text-xs text-[#5B6B80] leading-tight">{s.v}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-[#8A9BB0]">Trusted by clinics, hospitals & health startups across Kenya and beyond</p>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-6">
            <div className="relative rounded-[28px] bg-white border border-[#E6EEF6] shadow-[0_20px_60px_rgba(11,31,51,0.12)] overflow-hidden">
              {/* browser bar */}
              <div className="h-10 bg-[#0B1F33] flex items-center gap-2 px-4">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-white/70">AfyaDesk Dashboard — Live</span>
                <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-5 grid gap-4">
                <div className="flex gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#0B1F33] to-[#0F8B8D] flex items-center justify-center text-white font-bold shrink-0">
                    GM
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1F33] text-sm">Grace M. — Medical VA</div>
                    <div className="text-xs text-[#5B6B80]">Nairobi • Online • Handling calls & schedule</div>
                    <div className="mt-1 flex gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        On shift
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAF6FF] text-[#0B1F33] border border-[#E6EEF6]">
                        English • Swahili
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto text-right hidden sm:block">
                    <div className="text-xs text-[#8A9BB0]">Today</div>
                    <div className="text-sm font-bold text-[#0B1F33]">23 appointments</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Calls answered", value: "42", sub: "+6 today" },
                    { label: "No-show rate", value: "4.2%", sub: "↓ 38% vs last mo" },
                    { label: "Docs transcribed", value: "18", sub: "Avg 12 min" },
                  ].map((c) => (
                    <div key={c.label} className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
                      <div className="text-xs text-[#5B6B80]">{c.label}</div>
                      <div className="text-lg font-bold text-[#0B1F33]">{c.value}</div>
                      <div className="text-[11px] text-emerald-600">{c.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-[#E6EEF6] overflow-hidden">
                  <div className="px-4 py-3 bg-[#F8FAFC] flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0B1F33]">Today&apos;s Schedule</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white border border-[#E6EEF6]">8 confirmed</span>
                  </div>
                  <div className="divide-y divide-[#F1F5F9]">
                    {[
                      { t: "09:00", n: "A. Kamau — Consultation", d: "Dr. Wanjiku", s: "Confirmed" },
                      { t: "10:30", n: "J. Otieno — Dental cleaning", d: "Dr. Ochieng", s: "Checked in" },
                      { t: "11:15", n: "Tele — S. Mitchell (UK)", d: "Virtual", s: "Waiting room" },
                      { t: "14:00", n: "M. Achieng — Lab review", d: "Nairobi Lab", s: "Confirmed" },
                    ].map((r) => (
                      <div key={r.t} className="px-4 py-2.5 flex items-center gap-3 text-sm">
                        <span className="text-xs font-mono bg-[#0B1F33] text-white px-2 py-1 rounded-lg">{r.t}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-[#0B1F33] leading-none truncate">{r.n}</div>
                          <div className="text-xs text-[#5B6B80]">{r.d}</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
                          {r.s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5B6B80]">
                  <Zap className="h-4 w-4 text-[#0F8B8D]" /> Secure • Encrypted • Least-privilege access
                  <span className="ml-auto flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Nairobi → Global
                  </span>
                </div>
              </div>
            </div>

            {/* floating card */}
            <div className="hidden md:flex absolute -bottom-4 -left-4 rounded-2xl bg-white border border-[#E6EEF6] shadow-xl p-3 items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0B1F33]">Data protection first</div>
                <div className="text-xs text-[#5B6B80]">Confidentiality & access control built-in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
