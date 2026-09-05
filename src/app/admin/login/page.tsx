"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as any;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12 bg-[#F8FAFC]">
      <div className="w-full max-w-md rounded-[24px] bg-white border border-[#E6EEF6] p-8 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#0B1F33] flex items-center justify-center text-white font-bold text-sm">A.</div>
          <div>
            <div className="font-bold text-[#0B1F33]">AfyaDesk Admin</div>
            <div className="text-xs text-[#5B6B80]">Secure access for authorized staff only</div>
          </div>
        </div>

        <h1 className="mt-6 text-xl font-bold text-[#0B1F33]">Sign in</h1>
        <p className="text-sm text-[#5B6B80]">Demo: admin@afyadesk.co.ke / Admin123!</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label>Email</Label>
            <Input name="email" type="email" required defaultValue="admin@afyadesk.co.ke" />
          </div>
          <div>
            <Label>Password</Label>
            <Input name="password" type="password" required defaultValue="Admin123!" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-[#8A9BB0]">Protected by role-based access • Session cookie httpOnly</p>
      </div>
    </div>
  );
}
