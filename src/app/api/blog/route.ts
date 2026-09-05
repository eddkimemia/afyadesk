import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return NextResponse.json(posts);
  } catch {
    const { blogPosts } = await import("@/lib/data");
    return NextResponse.json(blogPosts.map((p) => ({ ...p, published: true, coverImage: (p as any).coverImage || (p as any).image })));
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  try {
    const post = await prisma.blogPost.create({
      data: {
        slug: parsed.data.slug,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt || null,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage || null,
        author: parsed.data.author || sess.name || null,
        published: parsed.data.published || false,
        publishedAt: parsed.data.published ? new Date() : null,
        tags: parsed.data.tags || [],
      },
    });
    return NextResponse.json(post);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
