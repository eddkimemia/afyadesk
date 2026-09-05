"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminBlogPage(){
  const [blog,setBlog]=useState<any[]>([]);
  async function load(){ const r=await fetch("/api/blog"); const j=await r.json(); if(Array.isArray(j)) setBlog(j); }
  useEffect(()=>{load();},[]);
  async function handleDelete(id:string){
    if(!confirm("Delete post?")) return;
    const r=await fetch(`/api/blog/${id}`,{method:"DELETE"});
    if(r.ok) load(); else alert("Failed");
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0B1F33]">Blog — {blog.length}</h1>
        <Link href="/admin/blog/new"><Button size="lg">+ New Post</Button></Link>
      </div>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6 grid gap-3">
        {blog.map((p:any)=><div key={p.id||p.slug} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] flex gap-3 items-center">
          {(p.coverImage||p.image) && <span className="relative h-16 w-24 rounded-xl overflow-hidden shrink-0 border bg-white"><Image src={p.coverImage||p.image} alt={p.title} fill className="object-cover" unoptimized/></span>}
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate text-[#0B1F33]">{p.title}</div>
            <div className="text-xs text-[#5B6B80]">{p.slug} • {p.published?"Published":"Draft"} • {p.id?.slice(0,8)}</div>
            <div className="text-xs text-[#8A9BB0] truncate">{p.excerpt?.slice(0,80)}</div>
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <Link href={`/admin/blog/${p.id||p.slug}`} className="h-8 px-4 rounded-full bg-[#0B1F33] text-white text-xs font-semibold flex items-center justify-center hover:bg-black">Edit</Link>
            <button onClick={()=>handleDelete(p.id||p.slug)} className="h-8 px-4 rounded-full bg-white border border-[#E6EEF6] text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>)}
        {blog.length===0 && <p className="text-sm text-[#5B6B80]">No posts. <Link href="/admin/blog/new" className="text-[#0F8B8D] font-semibold">Create one →</Link></p>}
      </div>
      <p className="text-xs text-[#8A9BB0]">Admin can edit at <span className="font-mono bg-white border px-1 py-0.5 rounded">/admin/blog/edit</span> (now /admin/blog/[id]) and add new at <span className="font-mono bg-white border px-1 py-0.5 rounded">/admin/blog/new</span>.</p>
    </div>
  );
}
