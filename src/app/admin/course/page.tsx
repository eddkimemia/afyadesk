"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import Image from "next/image";

export default function AdminCoursePage() {
  const [courseInfo,setCourseInfo]=useState<any>(null);
  const [coursePrice,setCoursePrice]=useState("");
  const [courseMsg,setCourseMsg]=useState<string|null>(null);
  const [materials,setMaterials]=useState<any[]>([]);
  const [matForm,setMatForm]=useState({ moduleNumber:"01", title:"", type:"PDF" as any, url:"" });
  const [matMsg,setMatMsg]=useState<string|null>(null);

  async function load(){
    const c=await fetch("/api/course").then(r=>r.json());
    setCourseInfo(c); setCoursePrice(String(c.price??""));
    const m=await fetch("/api/course-materials").then(r=>r.json());
    if(Array.isArray(m)) setMaterials(m);
  }
  useEffect(()=>{load();},[]);

  async function createMaterial(e:React.FormEvent){
    e.preventDefault();
    setMatMsg(null);
    const res=await fetch("/api/course-materials",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(matForm)});
    const j=await res.json();
    if(!res.ok) setMatMsg(j.error||"Failed");
    else { setMatMsg("✅ Material added"); setMatForm({moduleNumber:"01",title:"",type:"PDF",url:""}); load(); }
  }
  async function deleteMaterial(id:string){
    if(!confirm("Delete material?")) return;
    await fetch(`/api/course-materials/${id}`,{method:"DELETE"});
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0B1F33]">Course</h1>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
        <h3 className="font-bold text-[#0B1F33]">Price & Details</h3>
        <p className="text-sm text-[#5B6B80]">Price shown only on /course and /course/enroll — not in footer.</p>
        {courseInfo ? (
          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-4 text-sm"><span className="font-semibold">{courseInfo.title}</span> — KSh {courseInfo.price?.toLocaleString()} • {courseInfo.duration||""}</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><Label>Price (KSh) *</Label><Input type="number" min={0} value={coursePrice} onChange={(e)=>setCoursePrice(e.target.value)} /></div>
              <div className="flex items-end"><Button size="lg" onClick={async()=>{setCourseMsg(null); const res=await fetch("/api/course",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:parseInt(coursePrice,10)})}); const j=await res.json(); if(!res.ok) setCourseMsg(j.error||"Failed"); else {setCourseMsg(`✅ Price updated to KSh ${j.price.toLocaleString()}`); setCourseInfo(j);}}}>Update Price</Button></div>
            </div>
            {courseMsg && <p className="text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-3 py-2">{courseMsg}</p>}
          </div>
        ) : <p className="text-sm text-[#5B6B80] mt-3">Loading…</p>}
      </div>

      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
        <h3 className="font-bold text-[#0B1F33]">Module Materials — PDF / PPTX / VIDEO</h3>
        <p className="text-sm text-[#5B6B80]">Add resources per module (01-20). Students see them in portal after paid.</p>
        <form onSubmit={createMaterial} className="mt-4 grid md:grid-cols-2 gap-4">
          <div><Label>Module *</Label><select value={matForm.moduleNumber} onChange={(e)=>setMatForm({...matForm,moduleNumber:e.target.value})} className="flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm">{Array.from({length:20},(_,i)=>String(i+1).padStart(2,"0")).map(n=><option key={n} value={n}>Module {n}</option>)}</select></div>
          <div><Label>Type *</Label><select value={matForm.type} onChange={(e)=>setMatForm({...matForm,type:e.target.value as any})} className="flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm"><option value="PDF">PDF</option><option value="PPTX">PPTX</option><option value="VIDEO">VIDEO</option><option value="LINK">LINK</option></select></div>
          <div className="md:col-span-2"><Label>Title *</Label><Input value={matForm.title} onChange={(e)=>setMatForm({...matForm,title:e.target.value})} placeholder="e.g. Module 01 Slides" required/></div>
          <div className="md:col-span-2"><Label>URL *</Label><div className="flex gap-2"><Input value={matForm.url} onChange={(e)=>setMatForm({...matForm,url:e.target.value})} placeholder="/uploads/... or https://..." required className="flex-1"/><label className="h-11 px-4 rounded-xl border border-[#E6EEF6] bg-[#F8FAFC] text-sm font-medium flex items-center cursor-pointer">Upload<input type="file" accept=".pdf,.pptx,.ppt,.mp4,.webm,.mov" className="hidden" onChange={async(e)=>{const f=e.target.files?.[0]; if(!f) return; const fd=new FormData(); fd.append("file",f); const res=await fetch("/api/upload",{method:"POST",body:fd}); const j=await res.json(); if(res.ok) setMatForm({...matForm,url:j.url}); else alert(j.error);}} /></label></div></div>
          <div className="md:col-span-2"><Button type="submit" size="lg">Add Material</Button>{matMsg && <span className="ml-3 text-sm text-emerald-700">{matMsg}</span>}</div>
        </form>
        <div className="mt-6 space-y-2 max-h-[400px] overflow-y-auto">
          {materials.length===0? <p className="text-sm text-[#5B6B80]">No materials yet.</p> : materials.map((m:any)=><div key={m.id} className="flex justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] text-sm"><div><div className="font-medium">Module {m.moduleNumber} • {m.title} <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white border">{m.type}</span></div><a href={m.url} target="_blank" className="text-xs text-[#0F8B8D] break-all">{m.url}</a></div><button onClick={()=>deleteMaterial(m.id)} className="text-xs text-red-600 font-semibold">Delete</button></div>)}
        </div>
      </div>
    </div>
  );
}
