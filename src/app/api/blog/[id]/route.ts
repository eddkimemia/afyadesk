import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  slug: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  coverImage: z.string().optional().nullable(),
  author: z.string().optional(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("afyadesk_session")?.value;
  if (!token) return null;
  const sess = await verifyToken(token);
  if (!sess || sess.role !== "ADMIN") return null;
  return sess;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const post = await prisma.blogPost.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!post) {
      // fallback to static for demo when DB empty
      const { blogPosts } = await import("@/lib/data");
      const found = blogPosts.find((p) => p.slug === id);
      if (found) return NextResponse.json({ ...found, id: `static-${found.slug}`, published: true, content: `Demo content for ${found.title}. Edit will create a DB copy.` });
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  try {
    const existing = await prisma.blogPost.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!existing) {
      // if editing a static demo post, create it in DB instead
      const { blogPosts } = await import("@/lib/data");
      const isStatic = blogPosts.some((p) => p.slug === id || `static-${p.slug}` === id);
      if (isStatic || id.startsWith("static-")) {
        const slug = parsed.data.slug || id.replace("static-", "");
        const created = await prisma.blogPost.create({
          data: {
            slug,
            title: parsed.data.title || "Untitled",
            excerpt: parsed.data.excerpt || null,
            content: parsed.data.content || "Content",
            coverImage: parsed.data.coverImage || null,
            author: parsed.data.author || admin.name || null,
            published: parsed.data.published ?? false,
            publishedAt: parsed.data.published ? new Date() : null,
            tags: parsed.data.tags || [],
          },
        });
        return NextResponse.json(created);
      }
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data: any = {};
    if (parsed.data.slug !== undefined) data.slug = parsed.data.slug;
    if (parsed.data.title !== undefined) data.title = parsed.data.title;
    if (parsed.data.excerpt !== undefined) data.excerpt = parsed.data.excerpt;
    if (parsed.data.content !== undefined) data.content = parsed.data.content;
    if (parsed.data.coverImage !== undefined) data.coverImage = parsed.data.coverImage;
    if (parsed.data.author !== undefined) data.author = parsed.data.author;
    if (parsed.data.tags !== undefined) data.tags = parsed.data.tags;
    if (parsed.data.published !== undefined) {
      data.published = parsed.data.published;
      data.publishedAt = parsed.data.published ? new Date() : null;
    }
    // handle static- prefix
    const realId = existing.id.startsWith("static-") ? id : existing.id;
    if (existing.id.startsWith("static-")) {
      const slug = parsed.data.slug || id.replace("static-", "");
      const created = await prisma.blogPost.create({
        data: {
          slug,
          title: parsed.data.title || existing.title,
          excerpt: parsed.data.excerpt ?? (existing as any).excerpt ?? null,
          content: parsed.data.content || (existing as any).content || "Content",
          coverImage: parsed.data.coverImage ?? (existing as any).coverImage ?? null,
          author: parsed.data.author || admin.name || null,
          published: parsed.data.published ?? (existing as any).published ?? false,
          publishedAt: parsed.data.published ? new Date() : null,
          tags: parsed.data.tags || (existing as any).tags || [],
        },
      });
      return NextResponse.json(created);
    }
    const updated = await prisma.blogPost.update({ where: { id: existing.id }, data });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const existing = await prisma.blogPost.findFirst({ where: { OR: [{ id }, { slug: id }] } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await prisma.blogPost.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
