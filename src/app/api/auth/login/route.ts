import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), password: z.string().min(4) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    // Try DB, fallback to env admin for demo
    try {
      const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
      if (!user) {
        // check env fallback
        const adminEmail = process.env.ADMIN_EMAIL || "admin@afyadesk.co.ke";
        const adminPass = process.env.ADMIN_PASSWORD || "Admin123!";
        if (parsed.data.email === adminEmail && parsed.data.password === adminPass) {
          await createSession({ id: "env-admin", email: adminEmail, name: "Admin", role: "ADMIN" });
          return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
      const ok = await verifyPassword(parsed.data.password, user.password);
      if (!ok) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      await createSession({ id: user.id, email: user.email, name: user.name, role: user.role });
      return NextResponse.json({ success: true });
    } catch (dbErr: any) {
      // DB unavailable -> allow env admin
      const adminEmail = process.env.ADMIN_EMAIL || "admin@afyadesk.co.ke";
      const adminPass = process.env.ADMIN_PASSWORD || "Admin123!";
      if (parsed.data.email === adminEmail && parsed.data.password === adminPass) {
        await createSession({ id: "env-admin", email: adminEmail, name: "Admin", role: "ADMIN" });
        return NextResponse.json({ success: true, demo: true });
      }
      console.warn("Login DB error", dbErr?.message);
      return NextResponse.json({ error: "Database unavailable. Use demo credentials: admin@afyadesk.co.ke / Admin123!" }, { status: 503 });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
