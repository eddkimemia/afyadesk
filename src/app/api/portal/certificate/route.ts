import { NextResponse } from "next/server";
import { getPortalSession } from "@/lib/portal";
import { getSession as getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts, PDFFont } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const enrollmentIdParam = searchParams.get("enrollmentId");
  const portalSess = await getPortalSession();
  let enrollment: any = null;
  let isDemo = false;

  async function loadDemo(id: string) {
    try {
      const { readDemoEnrollments } = await import("@/lib/demo");
      const arr = await readDemoEnrollments();
      return arr.find((x: any) => x.id === id) || null;
    } catch { return null; }
  }
  async function saveDemo(en: any) {
    try {
      const { readDemoEnrollments, writeDemoEnrollments } = await import("@/lib/demo");
      const arr = await readDemoEnrollments();
      const idx = arr.findIndex((x: any) => x.id === en.id);
      if (idx !== -1) { arr[idx] = en; await writeDemoEnrollments(arr); }
    } catch {}
  }

  const adminSess = await getAdminSession();
  const isAdmin = !!(adminSess && (adminSess.role === "ADMIN" || adminSess.role === "STAFF"));

  if (enrollmentIdParam) {
    try {
      enrollment = await prisma.courseEnrollment.findUnique({ where: { id: enrollmentIdParam }, include: { course: true } });
    } catch (e: any) {
      const { isDbAuthError } = await import("@/lib/demo");
      if (isDbAuthError(e)) { enrollment = await loadDemo(enrollmentIdParam); if (enrollment) isDemo = true; } else throw e;
    }
    if (!enrollment && enrollmentIdParam.startsWith("demo-")) { enrollment = await loadDemo(enrollmentIdParam); if (enrollment) isDemo = true; }
    if (!enrollment) return new NextResponse("Not found", { status: 404 });
    if (!isAdmin) {
      if (portalSess && portalSess.enrollmentId !== enrollmentIdParam) return new NextResponse("Forbidden", { status: 403 });
      if (!portalSess && enrollment.status !== "COMPLETED") return new NextResponse("Not completed", { status: 403 });
    }
  } else {
    if (!portalSess && !isAdmin) return new NextResponse("Unauthorized", { status: 401 });
    const targetId = portalSess?.enrollmentId || enrollmentIdParam;
    if (!targetId) return new NextResponse("Unauthorized", { status: 401 });
    try {
      enrollment = await prisma.courseEnrollment.findUnique({ where: { id: targetId }, include: { course: true } });
    } catch (e: any) {
      const { isDbAuthError } = await import("@/lib/demo");
      if (isDbAuthError(e)) { enrollment = await loadDemo(targetId); if (enrollment) isDemo = true; } else throw e;
    }
    if (!enrollment) { enrollment = await loadDemo(targetId); if (enrollment) isDemo = true; }
    if (!enrollment) return new NextResponse("Not found", { status: 404 });
  }

  if (!isAdmin && enrollment.status !== "COMPLETED" && !enrollment.hasCompletedCourse) {
    return new NextResponse("Complete the course to download certificate. Admin can mark complete.", { status: 403 });
  }

  if (!enrollment.certificateNo) {
    const certNo = `AFYA-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    if (isDemo || enrollment.id.startsWith("demo-")) {
      enrollment.certificateNo = certNo;
      enrollment.hasCompletedCourse = true;
      enrollment.completedAt = enrollment.completedAt || new Date().toISOString();
      await saveDemo(enrollment);
    } else {
      try {
        enrollment = await prisma.courseEnrollment.update({ where: { id: enrollment.id }, data: { certificateNo: certNo, hasCompletedCourse: true, completedAt: enrollment.completedAt || new Date() } });
      } catch { enrollment.certificateNo = certNo; await saveDemo(enrollment); }
    }
  }

  let fullName = String(enrollment.fullName).trim();
  const rawDate = enrollment.completedAt || enrollment.updatedAt || new Date();
  const dateObj = rawDate instanceof Date ? rawDate : new Date(rawDate as any);
  const dateStr = dateObj.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
  const certNo = enrollment.certificateNo!;
  // Director editable via admin settings (SiteSetting director_name) — sanitize for WinAnsi
  const sanitizeWinAnsi = (s: string) => s.replace(/—/g, "-").replace(/–/g, "-").replace(/[^\x00-\xFF]/g, (c) => c === "—" || c === "–" ? "-" : "?");
  let director = "Dr. Grace Wanjiku, Director - AfyaDesk";
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key: "director_name" } });
    if (s?.value) director = sanitizeWinAnsi(s.value);
  } catch {
    try {
      const path2 = await import("path");
      const { readFile } = await import("fs/promises");
      const fp = path2.join(process.cwd(), "data", "settings-demo.json");
      const raw = await readFile(fp, "utf-8");
      const j = JSON.parse(raw);
      if (j.director_name) director = sanitizeWinAnsi(j.director_name);
    } catch {}
  }
  const rawCourseTitle = String(enrollment.course?.title || "AfyaDesk Remote Medical Careers Course").trim();
  const sanitize = (s: string) => s.replace(/—/g, "-").replace(/–/g, "-").replace(/[^\x00-\xFF]/g, "?");
  fullName = sanitize(fullName);
  const courseTitle = sanitize(rawCourseTitle);
  director = sanitizeWinAnsi(director);

  try {
    const certPath = path.join(process.cwd(), "public", "certificate.png");
    const pngBytes = await readFile(certPath);
    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(pngBytes);
    const imgW = 1536, imgH = 1024; // actual certificate.png size
    const pageWidth = 842, pageHeight = 595; // A4 landscape
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    const scale = Math.min(pageWidth / imgW, pageHeight / imgH);
    const drawW = imgW * scale, drawH = imgH * scale;
    const offsetX = (pageWidth - drawW) / 2;
    const offsetY = (pageHeight - drawH) / 2;

    // Helper: image (top-left origin) -> PDF (bottom-left origin)
    const toPdf = (imgX: number, imgY: number) => ({
      x: offsetX + imgX * scale,
      y: offsetY + (imgH - imgY) * scale,
    });
    const toPdfRect = (x0: number, y0: number, x1: number, y1: number) => {
      const p0 = toPdf(x0, y0);
      const p1 = toPdf(x1, y1);
      // y0 top, y1 bottom => p0.y > p1.y
      return { x: p0.x, y: p1.y, w: (x1 - x0) * scale, h: (y0 - y1) * -scale ? Math.abs(p1.y - p0.y) : (y1 - y0) * scale };
    };

    // Draw background
    page.drawImage(pngImage, { x: offsetX, y: offsetY, width: drawW, height: drawH });

    // Fonts - elegant
    const fontName = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const fontCourse = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontDirector = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontSmall = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    // Define bounding boxes — course title already in template, not drawn
    // Date/director slightly lower and further from midline, on top of gold lines, larger, colorful
    const boxes = {
      name: { x0: 380, y0: 465, x1: 1156, y1: 535 }, // between "This is to certify that" and gold divider at y 563
      date: { x0: 380, y0: 770, x1: 620, y1: 810 }, // left, further from midline, lower (was 480-720), on top of gold line
      director: { x0: 920, y0: 770, x1: 1160, y1: 810 }, // right, further from midline, lower
      certNo: { x0: 570, y0: 945, x1: 966, y1: 975 }, // slightly below previous (was 930-955), centered bottom, deeper color
    };

    // Helper: fit single line centered in box, auto scale, padding
    function drawFittedSingleLine(text: string, font: PDFFont, box: { x0:number,y0:number,x1:number,y1:number }, minSize: number, maxSize: number, color: any) {
      const rect = toPdfRect(box.x0, box.y0, box.x1, box.y1);
      const maxW = rect.w - 8; // 4px padding each side
      const maxH = rect.h - 4;
      let size = maxSize;
      let w = font.widthOfTextAtSize(text, size);
      let h = size; // approx
      while ((w > maxW || h > maxH) && size > minSize) {
        size -= 0.5;
        w = font.widthOfTextAtSize(text, size);
        h = size;
      }
      // wrap if still too wide (for long names, split)
      if (w > maxW) {
        // split into two lines if needed (for very long names like "Edwin Kamau Otieno")
        const parts = text.split(" ");
        let lines: string[] = [];
        let cur = "";
        for (const p of parts) {
          const test = cur ? cur + " " + p : p;
          if (font.widthOfTextAtSize(test, size) > maxW && cur) {
            lines.push(cur);
            cur = p;
          } else cur = test;
        }
        if (cur) lines.push(cur);
        // if still too many lines, reduce size
        const lineH = size * 1.15;
        while (lines.length * lineH > maxH && size > minSize) {
          size -= 0.5;
          // re-wrap
          lines = [];
          cur = "";
          for (const p of text.split(" ")) {
            const test = cur ? cur + " " + p : p;
            if (font.widthOfTextAtSize(test, size) > maxW && cur) { lines.push(cur); cur = p; } else cur = test;
          }
          if (cur) lines.push(cur);
        }
        // draw multi-line centered
        const totalH = lines.length * lineH;
        const startY = rect.y + (rect.h - totalH) / 2 + (lines.length - 1) * lineH;
        for (let i = 0; i < lines.length; i++) {
          const lw = font.widthOfTextAtSize(lines[i], size);
          page.drawText(lines[i], { x: rect.x + (rect.w - lw) / 2, y: startY - i * lineH, size, font, color });
        }
        return;
      }
      const x = rect.x + (rect.w - w) / 2;
      const y = rect.y + (rect.h - h) / 2;
      page.drawText(text, { x, y, size, font, color });
    }

    // 1. Recipient name — elegant, centered, within gold lines, auto scale 18-32 (handles edwin → Edwin Kamau Otieno)
    drawFittedSingleLine(fullName, fontName, boxes.name, 18, 32, rgb(0.05, 0.11, 0.26));

    // 2. Date — slightly lower, further from midline, larger, colorful teal
    drawFittedSingleLine(dateStr, fontRegular, boxes.date, 12, 15, rgb(0.06, 0.62, 0.65));

    // 3. Director — slightly lower, further from midline, larger, colorful teal/gold
    drawFittedSingleLine(director, fontDirector, boxes.director, 12, 14, rgb(0.71, 0.55, 0.15));

    // 4. Certificate No — slightly below previous (945-975), deeper navy for visibility, larger
    drawFittedSingleLine(`Certificate No: ${certNo}`, fontSmall, boxes.certNo, 8, 9.5, rgb(0.05, 0.15, 0.33));

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="AfyaDesk-Certificate-${fullName.replace(/\s+/g, "-")}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return new NextResponse("Failed to generate certificate: " + e.message, { status: 500 });
  }
}
