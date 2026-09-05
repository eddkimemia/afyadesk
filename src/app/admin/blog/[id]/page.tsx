"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";

export default function AdminBlogEditPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [form, setForm] = useState({ slug: "", title: "", excerpt: "", content: "", coverImage: "", published: true, tags: "" });
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/blog/${id}`);
      const j = await res.json();
      if (res.ok) {
        setForm({
          slug: j.slug || "",
          title: j.title || "",
          excerpt: j.excerpt || "",
          content: j.content || "",
          coverImage: j.coverImage || "",
          published: !!j.published,
          tags: Array.isArray(j.tags) ? j.tags.join(", ") : "",
        });
      } else {
        setMsg(j.error || "Failed to load");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
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
    const res = await fetch(`/api/blog/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const j = await res.json();
    setSaving(false);
    if (!res.ok) setMsg(j.error || "Failed");
    else {
      setMsg("✅ Updated — redirecting...");
      setTimeout(() => router.push("/admin/blog"), 800);
    }
  }

  async function onDelete() {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    const j = await res.json();
    if (!res.ok) alert(j.error || "Failed");
    else router.push("/admin/blog");
  }

  if (loading) return <div className="p-6 text-sm text-[#5B6B80]">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">Edit Blog Post</h1>
        <div className="flex gap-2">
          <Link href="/admin/blog" className="text-sm font-semibold text-[#5B6B80] hover:text-[#0B1F33] px-3 py-2">Back</Link>
          <button onClick={onDelete} className="text-sm font-semibold text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-full hover:bg-red-100">Delete</button>
        </div>
      </div>
      <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></div>
          <div className="flex items-end"><label className="flex gap-2 text-sm"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label></div>
        </div>
        <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div><Label>Excerpt</Label><Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
        <div><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} required /></div>
        <div><Label>Tags (comma)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
        <ImageUpload label="Featured Image" value={form.coverImage} onChange={(v) => setForm({ ...form, coverImage: v })} />
        {msg && <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{msg}</p>}
        <Button type="submit" size="lg" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
      </form>
    </div>
  );
}
