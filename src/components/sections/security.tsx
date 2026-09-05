import Link from "next/link";
import { Shield, Lock, EyeOff, GraduationCap, KeyRound, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SecuritySection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] px-3 py-1.5 text-xs font-semibold text-[#0B1F33]">
              <Shield className="h-4 w-4 text-[#0F8B8D]" /> Security & Confidentiality
            </div>
            <h2 className="mt-4 text-[28px] md:text-[36px] font-bold tracking-tight text-[#0B1F33] leading-tight">
              Healthcare Data Deserves Serious Protection
            </h2>
            <p className="mt-3 text-[#5B6B80] leading-7">
              We design our workflows around applicable Kenyan data-protection requirements and client security policies. Your patient and practice information is handled with strict internal procedures.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { icon: EyeOff, t: "Confidentiality", d: "NDA & ethics training" },
                { icon: KeyRound, t: "Access control", d: "Least-privilege access" },
                { icon: Lock, t: "Secure communication", d: "Encrypted channels" },
                { icon: GraduationCap, t: "Staff training", d: "Ongoing compliance" },
                { icon: FileCheck, t: "Data handling", d: "Defined retention & disposal" },
                { icon: Shield, t: "Client policies", d: "We adapt to your requirements" },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-4">
                  <x.icon className="h-5 w-5 text-[#0F8B8D]" />
                  <div className="mt-2 text-sm font-semibold text-[#0B1F33]">{x.t}</div>
                  <div className="text-xs text-[#5B6B80]">{x.d}</div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-[#8A9BB0]">
              Note: We do not make unsupported claims such as &quot;HIPAA certified&quot; or &quot;GDPR certified.&quot; Instead we operate
              with disciplined procedures and align with your security framework.
            </p>

            <Link href="/contact" className="mt-6 inline-block">
              <Button variant="navy" size="lg">
                Talk to Our Team About Security
              </Button>
            </Link>
          </div>

          <div className="rounded-[24px] bg-[#0B1F33] text-white p-6 md:p-8">
            <h3 className="font-semibold">How we protect your data</h3>
            <div className="mt-5 space-y-4">
              {[
                "Role-based access — assistants only see what they need",
                "Secure onboarding with confidentiality agreements",
                "Regular audits and activity logging",
                "Client-specific security requirements respected",
                "Offboarding controls when engagements end",
              ].map((t) => (
                <div key={t} className="flex gap-3 text-sm text-white/80">
                  <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs">✓</span>
                  {t}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-white/10 border border-white/15 p-4 text-sm leading-6 text-white/70">
              “AfyaDesk adapted to our hospital’s data handling policy on day one — no friction, just secure support.”
              <div className="mt-1 font-semibold text-white">— Operations, Private Hospital, Nairobi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
