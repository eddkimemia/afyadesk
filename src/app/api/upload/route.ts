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

    // Vercel has read-only filesystem except /tmp — try public/uploads first, fallback to /tmp/uploads
    let uploadDir = path.join(process.cwd(), "public", "uploads");
    let filePath = path.join(uploadDir, name);
    try {
      await mkdir(uploadDir, { recursive: true });
      await writeFile(filePath, buffer);
    } catch (err: any) {
      // Fallback for Vercel (EROFS: read-only)
      if (err?.code === "EROFS" || process.env.VERCEL) {
        const tmpDir = path.join("/tmp", "uploads");
        await mkdir(tmpDir, { recursive: true });
        filePath = path.join(tmpDir, name);
        await writeFile(filePath, buffer);
        // On Vercel /tmp is ephemeral and not served via /uploads — warn but return path
        // For persistent storage on Vercel, configure Vercel Blob (BLOB_READ_WRITE_TOKEN) and use @vercel/blob
        console.warn("Upload saved to /tmp (ephemeral on Vercel) — configure Vercel Blob for persistence:", filePath);
      } else {
        throw err;
      }
    }

    const url = `/uploads/${name}`;
    return NextResponse.json({ url });
  } catch (e: any) {
    const msg = e.message?.includes("EROFS") ? "Upload failed: read-only filesystem on Vercel. Configure Vercel Blob Storage (BLOB_READ_WRITE_TOKEN) or use external storage (S3/R2)." : e.message || "Upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
