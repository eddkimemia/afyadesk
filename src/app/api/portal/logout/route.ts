import { NextResponse } from "next/server";
import { destroyPortalSession } from "@/lib/portal";

export async function POST() {
  await destroyPortalSession();
  return NextResponse.json({ success: true });
}
