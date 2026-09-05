"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminServicesPage(){
  const [services,setServices]=useState<any[]>([]);
  async function load(){ const r=await fetch("/api/services"); const j=await r.json(); if(Array.isArray(j)) setServices(j); }
  useEffect(()=>{load();},[]);
  async function handleDelete(id:string){
    if(!confirm("Delete service?")) return;
    const r=await fetch(`/api/services/${id}`,{method:"DELETE"});
    const j=await r.json();
    if(!r.ok) alert(j.error||"Failed");
    else load();
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">Services — {services.length}</h1>
        <Link href="/admin/services/new"><Button size="lg">+ New Service</Button></Link>
      </div>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6 grid gap-3">
        {services.map((s:any)=><div key={s.id||s.slug} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] flex gap-4 items-center">
          {s.coverImage && <span className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 border bg-white"><Image src={s.coverImage} alt={s.title} fill className="object-cover" unoptimized/></span>}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[#0B1F33] truncate">{s.title}</div>
            <div className="text-xs text-[#5B6B80] truncate">{s.slug} • {s.icon || "—"}</div>
            <div className="text-xs text-[#8A9BB0] truncate">{s.description?.slice(0,100)}</div>
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <Link href={`/admin/services/${s.slug||s.id}`} className="h-8 px-4 rounded-full bg-[#0B1F33] text-white text-xs font-semibold flex items-center justify-center hover:bg-black">Edit</Link>
            <button onClick={()=>handleDelete(s.id||s.slug)} className="h-8 px-4 rounded-full bg-white border border-[#E6EEF6] text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>)}
        {services.length===0 && <p className="text-sm text-[#5B6B80]">No services. <Link href="/admin/services/new" className="text-[#0F8B8D] font-semibold">Create one →</Link></p>}
      </div>
      <p className="text-xs text-[#8A9BB0]">Admin can add at <span className="font-mono bg-white border px-1 py-0.5 rounded">/admin/services/new</span> and edit at <span className="font-mono bg-white border px-1 py-0.5 rounded">/admin/services/[slug]/edit</span> (now /admin/services/[id]).</p>
    </div>
  );
}
