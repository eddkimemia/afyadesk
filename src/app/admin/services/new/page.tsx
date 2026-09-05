"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";

export default function AdminServiceNewPage(){
  const [form,setForm]=useState({slug:"",title:"",description:"",coverImage:"",icon:"Stethoscope",features:"",content:""});
  const [msg,setMsg]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    setLoading(true); setMsg(null);
    const payload:any={
      slug: form.slug,
      title: form.title,
      description: form.description,
      coverImage: form.coverImage||null,
      icon: form.icon,
      features: form.features.split(",").map(s=>s.trim()).filter(Boolean),
      content: form.content||null,
    };
    const r=await fetch("/api/services",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const j=await r.json();
    setLoading(false);
    if(!r.ok) setMsg(j.error||"Failed");
    else { setMsg("✅ Created — redirecting..."); setTimeout(()=>router.push("/admin/services"),800); }
  }
  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">New Service</h1>
        <Link href="/admin/services" className="text-sm font-semibold text-[#0F8B8D]">← Back to Services</Link>
      </div>
      <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug *</Label><Input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} placeholder="my-service" required/></div>
          <div><Label>Icon</Label><Input value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} placeholder="Stethoscope" /></div>
        </div>
        <div><Label>Title *</Label><Input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></div>
        <div><Label>Description *</Label><Textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} required/></div>
        <div><Label>Features (comma separated)</Label><Input value={form.features} onChange={e=>setForm({...form,features:e.target.value})} placeholder="Feature 1, Feature 2" /></div>
        <div><Label>Content (optional longer text)</Label><Textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={4} /></div>
        <ImageUpload label="Cover Image" value={form.coverImage} onChange={v=>setForm({...form,coverImage:v})} />
        {msg && <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{msg}</p>}
        <Button type="submit" size="lg" disabled={loading}>{loading?"Creating...":"Create Service"}</Button>
      </form>
    </div>
  );
}
