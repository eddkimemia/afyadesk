import { VerifyForm } from "@/components/forms/verify-form";
import { BreadcrumbHero } from "@/components/ui/breadcrumb-hero";
import { ShieldCheck, Search, Award } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Verify Certificate — AfyaDesk Authenticity Check",
  description: "Verify an AfyaDesk certificate is authentic. Enter certificate number (e.g. AFYA-2026-ABC123) to confirm validity, recipient, course and issue date.",
};

export default async function VerifyPage({ searchParams }: { searchParams?: Promise<{ cert?: string }> | { cert?: string } }) {
  const sp = searchParams ? await Promise.resolve(searchParams as any) : {};
  const initialCert = (sp as any)?.cert || "";

  return (
    <div>
      <BreadcrumbHero
        eyebrow="Certificate Verification"
        title="Verify AfyaDesk Certificate"
        description="Confirm an AfyaDesk certificate is authentic and issued by AfyaDesk. Enter the Certificate No. printed at the bottom of the certificate (e.g. AFYA-2026-ABC123)."
        breadcrumb={[
          { label: "Verify", href: "/verify" },
        ]}
        featuredImage="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80"
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#0B1F33] font-bold"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Authenticity check</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white"><Award className="h-3.5 w-3.5" /> AfyaDesk issued</span>
        </div>
      </BreadcrumbHero>

      <div className="mx-auto max-w-3xl px-6 py-8 space-y-6">
        <div className="rounded-[20px] bg-white border border-[#E6EEF6] p-6 md:p-7 shadow-sm">
          <h2 className="font-bold text-[#0B1F33] text-lg flex items-center gap-2"><Search className="h-5 w-5 text-[#0F8B8D]" /> Enter Certificate Number</h2>
          <p className="text-sm text-[#5B6B80] mt-1">Found at the bottom of the certificate as <span className="font-mono text-xs bg-[#F8FAFC] border border-[#E6EEF6] px-1.5 py-0.5 rounded">Certificate No: AFYA-2026-XXXXXX</span>. Case-insensitive, dashes required.</p>
          <div className="mt-5">
            <VerifyForm initialCert={initialCert} />
          </div>
          <p className="text-xs text-[#8A9BB0] mt-3">Tip: Scan the QR on the certificate (if present) or copy the number exactly. Verification is instant and does not require login.</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E6EEF6] p-5">
          <h3 className="font-semibold text-[#0B1F33] flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0F8B8D]" /> How we verify</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-[#5B6B80] list-disc list-inside">
            <li>We check our secure registry (DB + demo) for the exact Certificate No.</li>
            <li>Valid certificates show recipient name, course title, completion date and director.</li>
            <li>Invalid or incomplete certificates show an error — contact <a href="mailto:hello@afyadesk.co.ke" className="text-[#0F8B8D] underline">hello@afyadesk.co.ke</a> or <a href="tel:+254753728292" className="text-[#0F8B8D] underline">+254 753 728 292</a>.</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/course" className="text-xs font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">About the course →</Link>
            <Link href="/careers" className="text-xs font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">Careers →</Link>
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 text-sm text-amber-900">
          <ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" />
          <p><span className="font-bold">Authenticity:</span> Only certificates issued via AfyaDesk portal (after marking COMPLETED) and viewable at <span className="font-mono text-xs bg-white border px-1.5 py-0.5 rounded">/api/portal/certificate?enrollmentId=...</span> are verifiable here. Forged numbers will show “Not found”.</p>
        </div>
      </div>
    </div>
  );
}
