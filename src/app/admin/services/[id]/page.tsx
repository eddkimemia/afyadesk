"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";

export default function AdminServiceEditPage(){
  const params=useParams();
  const id=params.id as string;
  const router=useRouter();
  const [form,setForm]=useState({slug:"",title:"",description:"",coverImage:"",icon:"Stethoscope",features:"",content:""});
  const [msg,setMsg]=useState<string|null>(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);

  useEffect(()=>{
    async function load(){
      const r=await fetch(`/api/services/${id}`);
      const j=await r.json();
      if(r.ok){
        setForm({
          slug: j.slug||"",
          title: j.title||"",
          description: j.description||"",
          coverImage: j.coverImage||"",
          icon: j.icon||"Stethoscope",
          features: Array.isArray(j.features)? j.features.join(", "):"",
          content: j.content||"",
        });
      } else setMsg(j.error||"Failed to load");
      setLoading(false);
    }
    load();
  },[id]);

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    setSaving(true); setMsg(null);
    const payload:any={
      slug: form.slug,
      title: form.title,
      description: form.description,
      coverImage: form.coverImage||null,
      icon: form.icon,
      features: form.features.split(",").map(s=>s.trim()).filter(Boolean),
      content: form.content||null,
    };
    const r=await fetch(`/api/services/${id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const j=await r.json();
    setSaving(false);
    if(!r.ok) setMsg(j.error||"Failed");
    else { setMsg("✅ Updated — redirecting..."); setTimeout(()=>router.push("/admin/services"),800); }
  }

  async function onDelete(){
    if(!confirm("Delete this service?")) return;
    const r=await fetch(`/api/services/${id}`,{method:"DELETE"});
    const j=await r.json();
    if(!r.ok) alert(j.error||"Failed");
    else router.push("/admin/services");
  }

  if(loading) return <div className="p-6 text-sm text-[#5B6B80]">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">Edit Service</h1>
        <div className="flex gap-2">
          <Link href="/admin/services" className="text-sm font-semibold text-[#5B6B80] px-3 py-2">Back</Link>
          <button onClick={onDelete} className="text-sm font-semibold text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-full">Delete</button>
        </div>
      </div>
      <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div><Label>Slug *</Label><Input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} required/></div>
          <div><Label>Icon</Label><Input value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} /></div>
        </div>
        <div><Label>Title *</Label><Input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/></div>
        <div><Label>Description *</Label><Textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} required/></div>
        <div><Label>Features (comma)</Label><Input value={form.features} onChange={e=>setForm({...form,features:e.target.value})} /></div>
        <div><Label>Content</Label><Textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} rows={4} /></div>
        <ImageUpload label="Cover Image" value={form.coverImage} onChange={v=>setForm({...form,coverImage:v})} />
        {msg && <p className="text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{msg}</p>}
        <Button type="submit" size="lg" disabled={saving}>{saving?"Saving...":"Save Changes"}</Button>
      </form>
    </div>
  );
}
