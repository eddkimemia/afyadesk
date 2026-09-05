"use client";
import { useState, useRef } from "react";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CourseEnrollForm({ courseSlug = "remote-medical-careers", priceLabel = "KSh 1,500" }: { courseSlug?: string; priceLabel?: string }) {
  const [loading, setLoading] = useState(false);
  const [stkState, setStkState] = useState<null | { enrollmentId: string; checkoutRequestId: string; mocked: boolean; amount: number }>(null);
  const [pollStatus, setPollStatus] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setPollStatus(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      courseSlug,
    };
    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "STK push failed");
      setStkState({ enrollmentId: j.enrollmentId, checkoutRequestId: j.checkoutRequestId, mocked: j.mocked, amount: j.amount });
      setPollStatus("PENDING");
      // start polling
      let attempts = 0;
      const interval = setInterval(async () => {
        attempts++;
        try {
          const s = await fetch(`/api/mpesa/status?enrollmentId=${j.enrollmentId}`).then((r) => r.json());
          if (s.status === "PAID" || s.status === "VERIFIED" || s.status === "COMPLETED") {
            clearInterval(interval);
            setPollStatus(s.status);
            setSuccess(true);
          } else if (s.status === "REJECTED") {
            clearInterval(interval);
            setPollStatus("REJECTED");
            setError(s.resultDesc || "Payment was cancelled or failed");
          } else {
            setPollStatus(s.status || "PENDING");
          }
        } catch {}
        if (attempts > 40) {
          clearInterval(interval);
          setError("Still pending — if you entered PIN, wait for SMS confirmation. Check portal login in a minute or contact support.");
        }
      }, 3000);
      pollRef.current = interval as any;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success && stkState) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
        <h3 className="font-bold text-[#0B1F33]">Payment received! 🎉</h3>
        <p className="text-sm text-[#5B6B80] mt-1">
          Your {priceLabel} payment was confirmed. You now have portal access — complete modules to earn your certificate.
        </p>
        <p className="text-xs text-[#8A9BB0] mt-2">Enrollment: {stkState.enrollmentId.slice(0, 8)} • Amount: KSh {stkState.amount} • {stkState.mocked ? "Mock STK (auto-confirmed)" : "Daraja STK"}</p>
        <div className="mt-4 flex gap-2 justify-center">
          <Link href="/portal/login" className="h-11 px-6 rounded-full bg-[#0B1F33] text-white text-sm font-semibold flex items-center gap-2">
            Go to Portal →
          </Link>
          <Button variant="secondary" onClick={() => { setSuccess(false); setStkState(null); setPollStatus(null); }}>
            Enroll another
          </Button>
        </div>
      </div>
    );
  }

  if (stkState) {
    return (
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6 text-center">
        <h3 className="font-bold text-[#0B1F33]">STK Push Sent 📲</h3>
        <p className="text-sm text-[#5B6B80] mt-1">
          Check your phone — enter M-Pesa PIN to pay <span className="font-bold text-[#0B1F33]">{priceLabel}</span>.
          {stkState.mocked && <span className="block text-xs mt-1 text-amber-800 bg-white border border-amber-200 rounded-lg px-2 py-1">Mock mode — will auto-confirm in ~12 seconds (no real money).</span>}
        </p>
        <p className="text-xs font-mono bg-white border border-[#E6EEF6] rounded-lg px-3 py-1.5 mt-3 inline-block">Checkout: {stkState.checkoutRequestId.slice(0, 20)}...</p>
        <p className="text-xs text-[#5B6B80] mt-2">Status: <span className="font-semibold text-[#0B1F33]">{pollStatus || "PENDING"}</span> • Polling...</p>
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mt-3">{error}</p>}
        <div className="mt-4 flex gap-2 justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              if (pollRef.current) clearInterval(pollRef.current as any);
              setStkState(null);
              setPollStatus(null);
              setError(null);
            }}
          >
            Cancel / Try again
          </Button>
        </div>
        <p className="text-xs text-[#8A9BB0] mt-3">Didn’t get prompt? Ensure phone is 2547... (e.g. +254 700 000000). STK expires in 2 mins.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input name="fullName" required placeholder="Grace Mwangi" />
        </div>
        <div>
          <Label>Email *</Label>
          <Input name="email" type="email" required placeholder="grace@email.com" />
        </div>
      </div>
      <div>
        <Label>Phone (M-Pesa — STK push) *</Label>
        <Input name="phone" required placeholder="07xx xxx xxx or 2547xx xxx xxx" />
        <p className="text-xs text-[#8A9BB0] mt-1">We’ll send an M-Pesa STK push — enter PIN on your phone. Safaricom Daraja. No Paybill code needed.</p>
      </div>
      <p className="text-xs text-[#5B6B80] bg-[#EAF6FF] border border-[#E6EEF6] rounded-xl px-3 py-2">
        💡 <span className="font-semibold">STK Push:</span> You’ll receive a prompt to pay <span className="font-bold">{priceLabel}</span>. Keep phone unlocked. Mock mode auto-confirms for testing.
      </p>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}
      <Button type="submit" size="xl" disabled={loading} className="w-full">
        {loading ? "Sending STK Push..." : `Pay ${priceLabel} via M-Pesa`}
      </Button>
      <p className="text-xs text-center text-[#8A9BB0]">One-time fee • Instant portal unlock after PIN • Live Daraja when env set, otherwise mock</p>
    </form>
  );
}
