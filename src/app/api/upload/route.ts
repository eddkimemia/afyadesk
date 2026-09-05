import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || (sess.role !== "ADMIN" && sess.role !== "STAFF")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    if (file.size > 25 * 1024 * 1024) return NextResponse.json({ error: "Max 25MB" }, { status: 400 });

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "",
    ];
    // allow empty mime (some pptx) or check extension fallback
    const extCheck = (file.name.split(".").pop() || "").toLowerCase();
    const extAllowed = ["jpg", "jpeg", "png", "webp", "pdf", "pptx", "ppt", "mp4", "webm", "mov"];
    if (!allowed.includes(file.type) && !extAllowed.includes(extCheck)) {
      return NextResponse.json({ error: "Only JPG/PNG/WEBP/PDF/PPTX/MP4" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop() || "jpg";
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, name);
    await writeFile(filePath, buffer);

    const url = `/uploads/${name}`;
    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 });
  }
}
