"use client";
import { useEffect, useState } from "react";

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courseInfo,setCourseInfo]=useState<any>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  async function load(){
    const [e,c]=await Promise.all([fetch("/api/course-enrollments").then(r=>r.ok?r.json():[]), fetch("/api/course").then(r=>r.json())]);
    if(Array.isArray(e)) setEnrollments(e);
    setCourseInfo(c);
  }
  useEffect(()=>{load();},[]);
  async function update(id:string, patch:any){
    await fetch(`/api/course-enrollments/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});
    load();
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#0B1F33]">Enrollments{courseInfo?` — KSh ${courseInfo.price?.toLocaleString()}`:""} • {enrollments.length}</h1>
      <p className="text-sm text-[#5B6B80]">M-Pesa <span className="font-semibold">STK Push</span> auto-verifies on payment — status becomes <span className="font-semibold">PAID</span>. Change status to <span className="font-semibold">COMPLETED</span> to grant certificate (download appears next to status).</p>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]"><tr><th className="text-left py-2 px-2">Student</th><th className="text-left py-2 px-2">M-Pesa STK</th><th className="text-left py-2 px-2">Progress</th><th className="text-left py-2 px-2">Status</th></tr></thead>
          <tbody>
            {enrollments.map((e:any)=>{
              const prog = Array.isArray(e.progress)? e.progress.filter((p:any)=>p.completed).length : 0;
              const isCompleted = e.status === "COMPLETED";
              const isExpanded = expanded === e.id;
              const progressMap = new Map((e.progress||[]).map((p:any)=>[p.moduleNumber, p.completed]));
              return (
                <>
                <tr key={e.id} className="border-b border-[#F1F5F9]">
                  <td className="py-3 px-2"><div className="font-medium text-[#0B1F33]">{e.fullName}</div><div className="text-xs text-[#5B6B80]">{e.email} • {e.phone}</div><div className="text-xs text-[#8A9BB0]">{new Date(e.createdAt).toLocaleDateString()} • {e.certificateNo?`Cert: ${e.certificateNo}`:"No cert"}</div></td>
                  <td className="py-3 px-2 text-xs">
                    <div>{e.mpesaCode||"—"} {e.amount?`• KSh ${e.amount}`:""}</div>
                    {e.checkoutRequestId && <div className="font-mono text-[11px] text-[#5B6B80] mt-1">Checkout: {e.checkoutRequestId.slice(0,18)}...</div>}
                    {e.mpesaResultCode !== null && e.mpesaResultCode !== undefined && <div className={`text-[11px] ${e.mpesaResultCode===0?"text-emerald-600":"text-red-600"}`}>Result: {e.mpesaResultCode} {e.mpesaResultDesc||""}</div>}
                    {e.stkInitiatedAt && <div className="text-[11px] text-[#8A9BB0]">STK: {new Date(e.stkInitiatedAt).toLocaleString()}</div>}
                  </td>
                  <td className="py-3 px-2 text-xs">
                    <button onClick={()=> setExpanded(isExpanded ? null : e.id)} className={`px-2 py-1 rounded-full font-semibold border ${prog===20?"bg-emerald-100 text-emerald-700 border-emerald-200": isExpanded?"bg-[#0B1F33] text-white border-[#0B1F33]":"bg-[#F8FAFC] border-[#E6EEF6] hover:bg-white"} flex items-center gap-1`}>
                      {prog}/20 {isExpanded ? "▼" : "▶"} <span className="hidden sm:inline">details</span>
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <select value={e.status} onChange={(ev)=>update(e.id,{status:ev.target.value})} className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white">
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="VERIFIED">VERIFIED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                      {isCompleted && (
                        <button onClick={async()=>{
                          const res=await fetch(`/api/portal/certificate?enrollmentId=${e.id}`);
                          if(!res.ok){const t=await res.text(); alert(t||"Failed"); return;}
                          const blob=await res.blob();
                          const url=URL.createObjectURL(blob);
                          const a=document.createElement("a");
                          a.href=url;
                          const disp=res.headers.get("Content-Disposition");
                          let fn=`AfyaDesk-Certificate-${e.fullName.replace(/\s+/g,"-")}.pdf`;
                          if(disp){const m=disp.match(/filename="?([^"]+)"?/); if(m) fn=m[1];}
                          a.download=fn; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
                        }} className="text-xs px-3 py-1.5 rounded-full bg-[#0B1F33] text-white font-semibold hover:bg-black flex items-center gap-1 whitespace-nowrap">
                          Download Cert
                        </button>
                      )}
                    </div>
                    {!isCompleted && <div className="text-[11px] text-[#8A9BB0] mt-1">Mark COMPLETED to enable download</div>}
                  </td>
                </tr>
                {isExpanded && (
                  <tr key={`${e.id}-detail`} className="bg-[#F8FAFC]">
                    <td colSpan={4} className="p-3">
                      <div className="rounded-xl bg-white border border-[#E6EEF6] p-3">
                        <div className="text-xs font-semibold text-[#0B1F33] mb-2">Modules — {prog}/20 completed • Click to toggle in portal, admin view only</div>
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                          {Array.from({length:20},(_,i)=> String(i+1).padStart(2,"0")).map((n)=>{
                            const done = !!progressMap.get(n);
                            return (
                              <div key={n} className={`h-8 rounded-lg border flex items-center justify-center text-xs font-bold ${done?"bg-emerald-500 text-white border-emerald-600":"bg-white text-[#5B6B80] border-[#E6EEF6]"}`}>
                                {done ? "✓" : n}
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {Array.from({length:20},(_,i)=> String(i+1).padStart(2,"0")).map((n)=>{
                            const done = !!progressMap.get(n);
                            return <span key={n} className={`text-[11px] px-2 py-1 rounded-full border ${done?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-white border-[#E6EEF6] text-[#8A9BB0]"}`}>M{n} {done?"✓":"○"}</span>
                          })}
                        </div>
                        {prog===0 && <p className="text-xs text-[#8A9BB0] mt-2">No modules marked done yet — student marks in portal, progress appears here.</p>}
                        {prog===20 && !isCompleted && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 mt-2">All 20 done — ready to mark COMPLETED and issue certificate.</p>}
                      </div>
                    </td>
                  </tr>
                )}
                </>
              );
            })}
            {enrollments.length===0 && <tr><td colSpan={4} className="text-center py-6 text-[#5B6B80]">No enrollments — test via /course/enroll</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
