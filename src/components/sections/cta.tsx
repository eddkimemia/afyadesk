import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[28px] bg-gradient-to-br from-[#0B1F33] via-[#0B1F33] to-[#0F8B8D] text-white p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center justify-between overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_80%_0%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to scale your healthcare practice?</h2>
            <p className="mt-2 text-white/70 max-w-xl">Book a free consultation. We&apos;ll map your workflow and recommend the right support model — no obligation.</p>
            <div className="mt-2 text-xs text-white/50">Kenyan Talent • Healthcare-Focused • Remote • Scalable • Secure</div>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="xl" className="w-full bg-white text-[#0B1F33] hover:bg-[#F1F5F9]">
                Book a Free Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="xl" variant="secondary" className="w-full bg-white/10 text-white border-white/20 hover:bg-white hover:text-[#0B1F33]">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
