import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return null;
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return null;
  return sess;
}

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value;
    if (!map["director_name"]) {
      // try demo file
      try {
        const path = await import("path");
        const { readFile } = await import("fs/promises");
        const fp = path.join(process.cwd(), "data", "settings-demo.json");
        const raw = await readFile(fp, "utf-8");
        const j = JSON.parse(raw);
        if (j.director_name) map["director_name"] = j.director_name;
      } catch {}
    }
    if (!map["director_name"]) map["director_name"] = "Dr. Grace Wanjiku, Director - AfyaDesk";
    return NextResponse.json(map);
  } catch (e: any) {
    try {
      const path = await import("path");
      const { readFile } = await import("fs/promises");
      const fp = path.join(process.cwd(), "data", "settings-demo.json");
      const raw = await readFile(fp, "utf-8");
      const j = JSON.parse(raw);
      if (j.director_name) return NextResponse.json(j);
    } catch {}
    return NextResponse.json({ director_name: "Dr. Grace Wanjiku, Director - AfyaDesk" });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  try {
    for (const [key, value] of Object.entries(body)) {
      if (typeof value !== "string") continue;
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    const updated = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of updated) map[s.key] = s.value;
    return NextResponse.json(map);
  } catch (e: any) {
    // fallback demo file
    try {
      const path = await import("path");
      const { mkdir, readFile, writeFile } = await import("fs/promises");
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      const fp = path.join(dir, "settings-demo.json");
      let existing: Record<string, string> = {};
      try { existing = JSON.parse(await readFile(fp, "utf-8")); } catch {}
      const next = { ...existing, ...body };
      await writeFile(fp, JSON.stringify(next, null, 2));
      return NextResponse.json(next);
    } catch {}
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
