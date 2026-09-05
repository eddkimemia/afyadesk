import Link from "next/link";
import { Button } from "@/components/ui/button";
import { industries } from "@/lib/data";

export function KenyaSection() {
  return (
    <section className="py-14 md:py-20 bg-[#F8FAFC] border-y border-[#E6EEF6]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#0F8B8D]">Built for Kenya</p>
            <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33] leading-tight">
              Built for Healthcare in Kenya
            </h2>
            <p className="mt-3 text-[#5B6B80] leading-7">
              From Nairobi to Mombasa, Kisumu to Eldoret — we understand the Kenyan healthcare environment. AfyaDesk
              supports private hospitals, clinics, medical centres, doctors’ practices, dental practices, laboratories,
              pharmacies, telemedicine providers and health startups.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industries.slice(0, 8).map((i) => (
                <span
                  key={i.name}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E6EEF6] text-xs font-semibold text-[#0B1F33]"
                >
                  {i.name}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-white border border-[#E6EEF6] p-4 flex gap-3 items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0B1F33] to-[#0F8B8D] shrink-0" />
              <div className="text-sm">
                <div className="font-semibold text-[#0B1F33]">Subtle Kenyan character, enterprise polish</div>
                <div className="text-[#5B6B80]">Professional, secure and proudly Kenyan — without stereotypes.</div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#0B1F33] text-white p-7">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-white/60">
              World-Class Support From Kenya
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight">Why international healthcare companies choose Kenya</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              {[
                "Strong English proficiency & professional communication",
                "Time-zone flexibility — cover UK, US, AU and East Africa",
                "Competitive operating costs without compromising quality",
                "Growing technology ecosystem & digital readiness",
                "Healthcare-trained talent with administrative excellence",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 inline-block">
              <Button size="lg" className="bg-white text-[#0B1F33] hover:bg-[#F1F5F9] border-0">
                Build Your Remote Healthcare Team
              </Button>
            </Link>
            <div className="mt-4 text-xs text-white/50">🇰🇪 Nairobi • 🇬🇧 UK • 🇺🇸 USA • 🇦🇺 Australia • East Africa</div>
          </div>
        </div>
      </div>
    </section>
  );
}
