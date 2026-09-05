"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";

export default function AdminBlogNewPage() {
  const [form, setForm] = useState({ slug: "", title: "", excerpt: "", content: "", coverImage: "", published: true, tags: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const payload: any = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage || null,
      published: form.published,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const j = await res.json();
    setLoading(false);
    if (!res.ok) setMsg(j.error || "Failed");
    else {
      setMsg("✅ Created — redirecting...");
      setTimeout(() => router.push("/admin/blog"), 800);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">New Blog Post</h1>
        <Link href="/admin/blog" className="text-sm font-semibold text-[#0F8B8D] hover:text-[#0B1F33]">← Back to Blog</Link>
      </div>
      <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-post-slug" required /></div>
          <div className="flex items-end"><label className="flex gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label></div>
        </div>
        <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div><Label>Excerpt</Label><Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
        <div><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} required /></div>
        <div><Label>Tags (comma)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Medical VA, Kenya" /></div>
        <ImageUpload label="Featured Image" value={form.coverImage} onChange={(v) => setForm({ ...form, coverImage: v })} />
        {msg && <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{msg}</p>}
        <Button type="submit" size="lg" disabled={loading}>{loading ? "Creating..." : "Create Post"}</Button>
      </form>
    </div>
  );
}
