"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ShieldCheck, XCircle, CheckCircle2, Search, Award, Calendar, User, Hash, Loader2 } from "lucide-react";
import Link from "next/link";

type VerifyResult =
  | { valid: true; certificateNo: string; fullName: string; courseTitle: string; completedAtFormatted?: string; completedAt?: string; director?: string; status?: string; message?: string }
  | { valid: false; certificateNo?: string; error: string; fullName?: string; courseTitle?: string; completedAt?: string; status?: string };

export function VerifyForm({ initialCert }: { initialCert?: string }) {
  const [certNo, setCertNo] = useState(initialCert || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [touched, setTouched] = useState(false);

  async function doVerify(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = certNo.trim();
    if (!trimmed) {
      setResult({ valid: false, error: "Please enter a certificate number (e.g. AFYA-2026-ABC123)" });
      return;
    }
    setLoading(true);
    setTouched(true);
    setResult(null);
    try {
      const res = await fetch(`/api/verify?cert=${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      if (!res.ok) {
        setResult({ valid: false, certificateNo: trimmed, error: json.error || "Certificate not found" });
      } else if (json.valid) {
        setResult(json);
        // update URL without reload for shareability
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("cert", json.certificateNo || trimmed);
          window.history.replaceState({}, "", url.toString());
        }
      } else {
        setResult({ valid: false, certificateNo: json.certificateNo || trimmed, error: json.error || "Not valid", ...json });
      }
    } catch (err: any) {
      setResult({ valid: false, error: err.message || "Verification failed. Try again." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialCert) {
      // auto-verify if cert in URL
      doVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <form onSubmit={doVerify} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="certNo" className="sr-only">Certificate Number</Label>
          <Input
            id="certNo"
            value={certNo}
            onChange={(e) => setCertNo(e.target.value.toUpperCase())}
            placeholder="AFYA-2026-XXXXXX"
            className="font-mono uppercase tracking-wide"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <Button type="submit" size="lg" disabled={loading} className="shrink-0">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>

      {touched && result && (
        <div className={`rounded-2xl border p-5 ${result.valid ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
          {result.valid ? (
            <>
              <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-2">Valid & Authentic <ShieldCheck className="h-4 w-4" /></div>
                  <div className="text-sm text-emerald-800 mt-1">{(result as any).message || "This certificate was issued by AfyaDesk and is verifiable in our registry."}</div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-emerald-200 text-xs font-bold text-emerald-700">AFYADESK • VERIFIED</span>
              </div>

              <div className="mt-4 grid gap-3 rounded-xl bg-white border border-emerald-100 p-4">
                <div className="flex gap-3 items-start">
                  <User className="h-4 w-4 text-[#0F8B8D] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#5B6B80] uppercase tracking-wide font-semibold">Recipient</div>
                    <div className="font-bold text-[#0B1F33]">{(result as any).fullName}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Award className="h-4 w-4 text-[#0F8B8D] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#5B6B80] uppercase tracking-wide font-semibold">Course</div>
                    <div className="text-sm font-medium text-[#0B1F33]">{(result as any).courseTitle}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Calendar className="h-4 w-4 text-[#0F8B8D] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#5B6B80] uppercase tracking-wide font-semibold">Completed</div>
                    <div className="text-sm text-[#0B1F33]">{(result as any).completedAtFormatted || ((result as any).completedAt ? new Date((result as any).completedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }) : "—")}</div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Hash className="h-4 w-4 text-[#0F8B8D] mt-0.5" />
                  <div>
                    <div className="text-xs text-[#5B6B80] uppercase tracking-wide font-semibold">Certificate No.</div>
                    <div className="font-mono text-sm font-bold text-[#0B1F33] break-all">{(result as any).certificateNo}</div>
                  </div>
                </div>
                {(result as any).director && (
                  <div className="text-xs text-[#5B6B80] border-t border-[#E6EEF6] pt-3 mt-1">
                    <span className="font-semibold text-[#0B1F33]">Director:</span> {(result as any).director} • <span className="font-semibold">Verify at</span> <Link href={`/verify?cert=${encodeURIComponent((result as any).certificateNo)}`} className="underline text-[#0F8B8D]">afyadesk.co.ke/verify?cert={(result as any).certificateNo}</Link>
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/verify?cert=${encodeURIComponent((result as any).certificateNo)}`} className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline">Share verification link</Link>
                <span className="text-xs text-[#8A9BB0]">•</span>
                <Link href="/course" className="text-xs font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">About course →</Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <span className="h-10 w-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0">
                  <XCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-red-900">Not Found / Not Authentic</div>
                  <div className="text-sm text-red-800 mt-1">{result.error}</div>
                  {(result as any).certificateNo && <div className="font-mono text-xs mt-2 bg-white border border-red-200 rounded-lg px-2 py-1 inline-block">Checked: {(result as any).certificateNo}</div>}
                  {(result as any).fullName && (
                    <div className="text-xs text-[#5B6B80] mt-2">Matched name: <span className="font-semibold text-[#0B1F33]">{(result as any).fullName}</span> — but status: {(result as any).status}</div>
                  )}
                </div>
              </div>
              <div className="mt-3 text-xs text-[#8A9BB0]">Double-check dashes and characters. Valid format: <span className="font-mono bg-white border px-1.5 py-0.5 rounded">AFYA-2026-XXXXXX</span> (6 alphanumeric after year). Need help? <a href="mailto:hello@afyadesk.co.ke" className="underline text-[#0F8B8D]">hello@afyadesk.co.ke</a> • <a href="tel:+254753728292" className="underline text-[#0F8B8D]">+254 753 728 292</a></div>
            </>
          )}
        </div>
      )}

      {!touched && (
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3 flex gap-2.5 text-sm text-[#5B6B80]">
          <ShieldCheck className="h-4 w-4 text-[#0F8B8D] shrink-0 mt-0.5" />
          <p>We verify against the live AfyaDesk registry (including demo enrollments on Vercel when DB not migrated). A valid result means the printed name, course and certificate number match our records.</p>
        </div>
      )}
    </div>
  );
}
