import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [totalLeads, newLeads, qualified, won, totalApps, totalBlogs] = await Promise.all([
      prisma.lead.count({ where: { deletedAt: null } }),
      prisma.lead.count({ where: { status: "NEW", deletedAt: null } }),
      prisma.lead.count({ where: { status: "QUALIFIED", deletedAt: null } }),
      prisma.lead.count({ where: { status: "WON", deletedAt: null } }),
      prisma.jobApplication.count(),
      prisma.blogPost.count(),
    ]);
    const conversion = totalLeads ? Math.round((won / totalLeads) * 100) : 0;
    return NextResponse.json({ totalLeads, newLeads, qualified, won, totalApps, totalBlogs, conversionRate: conversion });
  } catch (e: any) {
    // fallback demo stats
    return NextResponse.json({
      totalLeads: 24,
      newLeads: 7,
      qualified: 5,
      won: 4,
      totalApps: 18,
      totalBlogs: 7,
      conversionRate: 17,
      demo: true,
    });
  }
}
