"use client";
import { useEffect, useState } from "react";

export default function AdminApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  async function load() {
    const r = await fetch("/api/applications");
    const j = await r.json();
    if (Array.isArray(j)) setApps(j);
  }
  useEffect(()=>{load();},[]);
  async function update(id:string, patch:any){
    await fetch(`/api/applications/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});
    load();
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0B1F33]">Applications — {apps.length} <span className="text-xs font-normal text-[#0F8B8D]">(prioritised first)</span></h1>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]"><tr><th className="text-left py-2 px-2">Candidate</th><th className="text-left py-2 px-2">Position</th><th className="text-left py-2 px-2">Priority</th><th className="text-left py-2 px-2">Status</th><th className="text-left py-2 px-2">Message</th></tr></thead>
          <tbody>
            {[...apps].sort((a,b)=>(b.hasCompletedCourse?1:0)-(a.hasCompletedCourse?1:0)).map((a)=>(
              <tr key={a.id} className={`border-b border-[#F1F5F9] ${a.hasCompletedCourse?"bg-amber-50/50":""}`}>
                <td className="py-3 px-2"><div className="font-medium text-[#0B1F33] flex items-center gap-1.5">{a.fullName} {a.hasCompletedCourse && <span className="text-[10px] bg-amber-400 text-[#0B1F33] px-1.5 py-0.5 rounded-full font-bold">COURSE • PRIORITY</span>}</div><div className="text-xs text-[#5B6B80]">{a.email} • {a.phone}</div>{a.courseCertificateUrl && <a href={a.courseCertificateUrl} target="_blank" className="text-xs text-[#0F8B8D] underline">Certificate</a>}</td>
                <td className="py-3 px-2 text-xs">{a.position}</td>
                <td className="py-3 px-2">{a.hasCompletedCourse?<span className="text-xs font-bold bg-amber-100 border border-amber-200 px-2 py-1 rounded-full text-amber-700">Prioritised</span>:<span className="text-xs text-[#8A9BB0]">Standard</span>}</td>
                <td className="py-3 px-2"><select value={a.status} onChange={(e)=>update(a.id,{status:e.target.value})} className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white">{["PENDING","REVIEWING","SHORTLISTED","REJECTED","HIRED"].map(s=><option key={s} value={s}>{s}</option>)}</select></td>
                <td className="py-3 px-2 text-xs max-w-[240px] truncate">{a.message||"—"}</td>
              </tr>
            ))}
            {apps.length===0 && <tr><td colSpan={5} className="text-center py-6 text-[#5B6B80]">No applications — test via /careers/apply</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
