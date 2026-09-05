import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

// Public endpoint for career application certificate uploads (no auth)
// Restricted to PDF/images, max 5MB
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file selected" }, { status: 400 });

    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "File too large — max 5MB" }, { status: 400 });

    const allowedMime = ["image/jpeg", "image/png", "image/webp", "image/jpg", "application/pdf"];
    const ext = (file.name.split(".").pop() || "").toLowerCase();
    const extAllowed = ["jpg", "jpeg", "png", "webp", "pdf"];

    if (!allowedMime.includes(file.type) && !extAllowed.includes(ext)) {
      return NextResponse.json({ error: "Only PDF, JPG, PNG, WEBP allowed" }, { status: 400 });
    }
    // sanitize extension
    const safeExt = extAllowed.includes(ext) ? ext : file.type === "application/pdf" ? "pdf" : "jpg";
    const name = `cert-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${safeExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, name);
    await writeFile(filePath, buffer);

    const url = `/uploads/${name}`;
    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 });
  }
}
