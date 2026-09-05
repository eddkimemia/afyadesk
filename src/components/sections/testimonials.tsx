import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section className="py-14 md:py-20 bg-[#0B1F33] text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-white/60">Testimonials</p>
          <h2 className="mt-2 text-[28px] md:text-[36px] font-bold tracking-tight">Trusted by healthcare teams</h2>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-[20px] bg-white text-[#0B1F33] p-6">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#172033]">“{t.content}”</p>
              <div className="mt-4 flex gap-3 items-center">
                <div className="h-10 w-10 rounded-full bg-[#0B1F33] text-white flex items-center justify-center font-bold text-sm">
                  {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[#5B6B80]">
                    {t.role} • {t.org}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
