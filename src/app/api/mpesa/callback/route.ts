import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Daraja callback shape: { Body: { stkCallback: { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata: { Item: [...] } } } }
// We accept both wrapped and plain

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const stk = body?.Body?.stkCallback || body?.stkCallback || body;
    const checkoutId: string | undefined = stk?.CheckoutRequestID;
    const merchantId: string | undefined = stk?.MerchantRequestID;
    const resultCode: number | undefined = stk?.ResultCode;
    const resultDesc: string | undefined = stk?.ResultDesc;

    // Extract MpesaReceipt if present
    let mpesaCode: string | undefined;
    const items: any[] = stk?.CallbackMetadata?.Item || [];
    for (const it of items) {
      if (it.Name === "MpesaReceiptNumber" && it.Value) mpesaCode = String(it.Value);
    }

    if (!checkoutId) {
      // still return success to Daraja
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted but no CheckoutRequestID" });
    }

    // Try DB update
    try {
      const enrollment = await prisma.courseEnrollment.findFirst({ where: { checkoutRequestId: checkoutId } });
      if (enrollment) {
        const status = resultCode === 0 ? "PAID" : "PENDING";
        await prisma.courseEnrollment.update({
          where: { id: enrollment.id },
          data: {
            mpesaCode: mpesaCode || enrollment.mpesaCode,
            mpesaResultCode: resultCode,
            mpesaResultDesc: resultDesc,
            merchantRequestId: merchantId || enrollment.merchantRequestId,
            status: status as any,
          },
        });
        return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
      }
    } catch (dbErr) {
      console.warn("DB callback update failed, trying demo file", dbErr);
    }

    // Demo file fallback
    try {
      const path = await import("path");
      const { readFile, writeFile, mkdir } = await import("fs/promises");
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      const fp = path.join(dir, "enrollments-demo.json");
      const raw = await readFile(fp, "utf-8");
      const arr = JSON.parse(raw);
      const idx = arr.findIndex((x: any) => x.checkoutRequestId === checkoutId || x.merchantRequestId === merchantId);
      if (idx !== -1) {
        arr[idx].mpesaCode = mpesaCode || arr[idx].mpesaCode;
        arr[idx].mpesaResultCode = resultCode;
        arr[idx].mpesaResultDesc = resultDesc;
        if (resultCode === 0) arr[idx].status = "PAID";
        arr[idx].updatedAt = new Date().toISOString();
        await writeFile(fp, JSON.stringify(arr, null, 2));
      }
    } catch {}

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (e: any) {
    return NextResponse.json({ ResultCode: 1, ResultDesc: e.message }, { status: 200 });
  }
}

// Daraja validates callback URL must respond 200; allow GET for testing
export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST Daraja callback here" });
}
