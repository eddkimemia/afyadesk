"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PortalLoginForm({ nextUrl = "/course/portal" }: { nextUrl?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const phone = String(fd.get("phone") || "");
    try {
      const res = await fetch("/api/portal/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, phone }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Login failed");
      router.push(nextUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Email used at enrollment *</Label>
        <Input name="email" type="email" required placeholder="you@email.com" />
      </div>
      <div>
        <Label>Phone (M-Pesa) *</Label>
        <Input name="phone" required placeholder="+254 7xx xxx xxx" />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Checking..." : "Access Portal"}
      </Button>
      <p className="text-xs text-center text-[#8A9BB0]">Only paid/verified/completed enrollments can access. Pending payments must be verified by admin.</p>
    </form>
  );
}
