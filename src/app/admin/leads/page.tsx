"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  async function load() {
    const res = await fetch("/api/leads");
    const j = await res.json();
    if (Array.isArray(j)) setLeads(j);
  }
  useEffect(() => { load(); }, []);

  async function updateLead(id: string, patch: any) {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    load();
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Organization", "Service", "Status", "Created"];
    const rows = leads.map((l) => [l.fullName, l.email, l.phone || "", l.organization || "", l.servicesRequired || "", l.status, l.createdAt]);
    const csv = [headers, ...rows].map((r) => r.map((c: any) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `afyadesk-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1F33]">Leads — {leads.length}</h1>
        <div className="flex gap-2">
          <Input placeholder="Search name/email" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 w-48" />
          <Button size="sm" variant="secondary" onClick={exportCSV}>Export CSV</Button>
        </div>
      </div>
      <div className="rounded-2xl bg-white border border-[#E6EEF6] p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]">
            <tr><th className="text-left py-2 px-2">Name</th><th className="text-left py-2 px-2">Organization</th><th className="text-left py-2 px-2">Service</th><th className="text-left py-2 px-2">Status</th><th className="text-left py-2 px-2">Notes</th><th className="text-left py-2 px-2">Actions</th></tr>
          </thead>
          <tbody>
            {leads.filter((l) => !filter || `${l.fullName} ${l.email}`.toLowerCase().includes(filter.toLowerCase())).map((l) => (
              <tr key={l.id} className="border-b border-[#F1F5F9]">
                <td className="py-3 px-2"><div className="font-medium text-[#0B1F33]">{l.fullName}</div><div className="text-xs text-[#5B6B80]">{l.email} • {l.phone || "—"}</div></td>
                <td className="py-3 px-2">{l.organization || "—"}</td>
                <td className="py-3 px-2 text-xs">{l.servicesRequired || "—"}</td>
                <td className="py-3 px-2">
                  <select value={l.status} onChange={(e) => updateLead(l.id, { status: e.target.value })} className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white">
                    {["NEW","CONTACTED","QUALIFIED","PROPOSAL_SENT","WON","LOST"].map((s)=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="py-3 px-2 max-w-[180px]"><input defaultValue={l.notes || ""} placeholder="Add notes" onBlur={(e)=> e.target.value!==l.notes && updateLead(l.id,{notes:e.target.value})} className="w-full text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5" /></td>
                <td className="py-3 px-2"><button onClick={()=> updateLead(l.id,{assignedTo: prompt("Assign to:", l.assignedTo||"")||l.assignedTo})} className="text-xs font-semibold text-[#0F8B8D]">{l.assignedTo?`Assigned: ${l.assignedTo}`:"Assign"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length===0 && <p className="text-sm text-[#5B6B80] py-6 text-center">No leads — test via /contact</p>}
      </div>
    </div>
  );
}
