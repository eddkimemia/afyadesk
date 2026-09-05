"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Select, Label, Textarea } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import Link from "next/link";
import Image from "next/image";

type Lead = any;
type App = any;

const leadStatuses = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "WON", "LOST"];
const appStatuses = ["PENDING", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];

export default function AdminDashboardClient({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [tab, setTab] = useState<"dashboard" | "leads" | "applications" | "enrollments" | "course" | "services" | "blog" | "testimonials" | "faqs" | "settings">("dashboard");
  const [services, setServices] = useState<any[]>([]);
  const [blog, setBlog] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courseInfo, setCourseInfo] = useState<any>(null);
  const [coursePrice, setCoursePrice] = useState<string>("");
  const [courseMsg, setCourseMsg] = useState<string | null>(null);
  const [materials, setMaterials] = useState<any[]>([]);
  const [matForm, setMatForm] = useState({ moduleNumber: "01", title: "", type: "PDF" as "PDF" | "PPTX" | "VIDEO" | "LINK", url: "" });
  const [matMsg, setMatMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  // blog form state
  const [blogForm, setBlogForm] = useState({ slug: "", title: "", excerpt: "", content: "", coverImage: "", published: true, tags: "" });
  const [blogMsg, setBlogMsg] = useState<string | null>(null);

  // service form
  const [svcForm, setSvcForm] = useState({ slug: "", title: "", description: "", coverImage: "", icon: "Stethoscope" });
  const [svcMsg, setSvcMsg] = useState<string | null>(null);

  async function loadAll() {
    try {
      const s = await fetch("/api/admin/stats").then((r) => r.json());
      setStats(s);
    } catch {}
    try {
      const l = await fetch("/api/leads").then((r) => (r.ok ? r.json() : []));
      setLeads(Array.isArray(l) ? l : []);
    } catch {}
    try {
      const a = await fetch("/api/applications").then((r) => (r.ok ? r.json() : []));
      setApps(Array.isArray(a) ? a : []);
    } catch {}
    try {
      const sv = await fetch("/api/services").then((r) => r.json());
      setServices(Array.isArray(sv) ? sv : []);
    } catch {}
    try {
      const b = await fetch("/api/blog").then((r) => r.json());
      setBlog(Array.isArray(b) ? b : []);
    } catch {}
    try {
      const e = await fetch("/api/course-enrollments").then((r) => (r.ok ? r.json() : []));
      setEnrollments(Array.isArray(e) ? e : []);
    } catch {}
    try {
      const c = await fetch("/api/course").then((r) => r.json());
      setCourseInfo(c);
      setCoursePrice(String(c.price ?? ""));
    } catch {}
    try {
      const m = await fetch("/api/course-materials").then((r) => r.json());
      setMaterials(Array.isArray(m) ? m : []);
    } catch {}
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function updateLead(id: string, patch: any) {
    await fetch(`/api/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    loadAll();
  }

  async function updateApp(id: string, patch: any) {
    await fetch(`/api/applications/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    loadAll();
  }

  async function createBlog(e: React.FormEvent) {
    e.preventDefault();
    setBlogMsg(null);
    const payload: any = {
      slug: blogForm.slug,
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      coverImage: blogForm.coverImage || null,
      published: blogForm.published,
      tags: blogForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const json = await res.json();
    if (!res.ok) setBlogMsg(json.error || "Failed");
    else {
      setBlogMsg("✅ Blog post created");
      setBlogForm({ slug: "", title: "", excerpt: "", content: "", coverImage: "", published: true, tags: "" });
      loadAll();
    }
  }

  async function createService(e: React.FormEvent) {
    e.preventDefault();
    setSvcMsg(null);
    const res = await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(svcForm) });
    const json = await res.json();
    if (!res.ok) setSvcMsg(json.error || "Failed");
    else {
      setSvcMsg("✅ Service created");
      setSvcForm({ slug: "", title: "", description: "", coverImage: "", icon: "Stethoscope" });
      loadAll();
    }
  }

  async function createMaterial(e: React.FormEvent) {
    e.preventDefault();
    setMatMsg(null);
    const res = await fetch("/api/course-materials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(matForm) });
    const j = await res.json();
    if (!res.ok) setMatMsg(j.error || "Failed");
    else {
      setMatMsg("✅ Material added");
      setMatForm({ moduleNumber: "01", title: "", type: "PDF", url: "" });
      loadAll();
    }
  }

  async function deleteMaterial(id: string) {
    if (!confirm("Delete material?")) return;
    await fetch(`/api/course-materials/${id}`, { method: "DELETE" });
    loadAll();
  }

  async function updateEnrollment(id: string, patch: any) {
    await fetch(`/api/course-enrollments/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) });
    loadAll();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function exportLeadsCSV() {
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
    <div className="min-h-[70vh] bg-[#F8FAFC]">
      {/* admin header */}
      <div className="bg-white border-b border-[#E6EEF6]">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AfyaDesk" width={120} height={36} className="h-7 w-auto object-contain" />
              <span className="text-sm text-[#5B6B80] hidden sm:inline">Admin</span>
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] font-semibold text-[#0B1F33]">{user.role}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5B6B80] hidden sm:inline">{user.email}</span>
            <button onClick={logout} className="text-sm font-semibold text-[#0B1F33] border border-[#E6EEF6] px-4 py-2 rounded-full hover:bg-[#F8FAFC]">
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        {/* sidebar */}
        <div className="bg-white border border-[#E6EEF6] rounded-2xl p-2 h-fit sticky top-6">
          {[
            ["Dashboard", "dashboard"],
            ["Leads", "leads"],
            ["Applications", "applications"],
            ["Enrollments", "enrollments"],
            ["Course", "course"],
            ["Services", "services"],
            ["Blog", "blog"],
            ["Testimonials", "testimonials"],
            ["FAQs", "faqs"],
            ["Website Settings", "settings"],
          ].map(([label, key]) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${tab === key ? "bg-[#0B1F33] text-white" : "hover:bg-[#F8FAFC] text-[#172033]"}`}
            >
              {label}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-[#E6EEF6] px-3">
            <p className="text-xs text-[#8A9BB0]">Admin can upload different featured images for blogs & services via upload.</p>
          </div>
        </div>

        <div className="space-y-5">
          {tab === "dashboard" && stats && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Total Leads", value: stats.totalLeads },
                  { label: "New Leads", value: stats.newLeads },
                  { label: "Qualified", value: stats.qualified },
                  { label: "Won", value: stats.won },
                  { label: "Applications", value: stats.totalApps },
                  { label: "Conversion Rate", value: `${stats.conversionRate}%` },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white border border-[#E6EEF6] p-5">
                    <div className="text-xs text-[#5B6B80] font-semibold tracking-wide uppercase">{s.label}</div>
                    <div className="mt-1 text-2xl font-bold text-[#0B1F33]">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
                <h3 className="font-semibold text-[#0B1F33]">Recent Leads</h3>
                <div className="mt-4 space-y-2">
                  {leads.slice(0, 5).map((l) => (
                    <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] text-sm">
                      <div>
                        <div className="font-medium text-[#0B1F33]">{l.fullName}</div>
                        <div className="text-xs text-[#5B6B80]">{l.email} • {l.servicesRequired || "—"}</div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-[#E6EEF6] font-semibold">{l.status}</span>
                    </div>
                  ))}
                  {leads.length === 0 && <p className="text-sm text-[#5B6B80]">No leads yet — submit a test via Contact page.</p>}
                </div>
              </div>
            </>
          )}

          {tab === "leads" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <h3 className="font-bold text-[#0B1F33]">Leads — {leads.length}</h3>
                <div className="flex gap-2">
                  <Input placeholder="Search name/email" value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 w-48" />
                  <Button size="sm" variant="secondary" onClick={exportLeadsCSV}>Export CSV</Button>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]">
                    <tr>
                      <th className="text-left py-2 px-2">Name</th>
                      <th className="text-left py-2 px-2">Organization</th>
                      <th className="text-left py-2 px-2">Service</th>
                      <th className="text-left py-2 px-2">Status</th>
                      <th className="text-left py-2 px-2">Notes</th>
                      <th className="text-left py-2 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads
                      .filter((l) => !filter || `${l.fullName} ${l.email}`.toLowerCase().includes(filter.toLowerCase()))
                      .map((l) => (
                        <tr key={l.id} className="border-b border-[#F1F5F9]">
                          <td className="py-3 px-2">
                            <div className="font-medium text-[#0B1F33]">{l.fullName}</div>
                            <div className="text-xs text-[#5B6B80]">{l.email} • {l.phone || "—"} • {l.country || ""}</div>
                          </td>
                          <td className="py-3 px-2 text-[#172033]">{l.organization || "—"}</td>
                          <td className="py-3 px-2 text-xs">{l.servicesRequired || "—"} <div className="text-[#8A9BB0]">{l.numberOfStaff || ""}</div></td>
                          <td className="py-3 px-2">
                            <select
                              value={l.status}
                              onChange={(e) => updateLead(l.id, { status: e.target.value })}
                              className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white"
                            >
                              {leadStatuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-2 max-w-[180px]">
                            <input
                              defaultValue={l.notes || ""}
                              placeholder="Add notes"
                              onBlur={(e) => e.target.value !== l.notes && updateLead(l.id, { notes: e.target.value })}
                              className="w-full text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <button
                              onClick={() => updateLead(l.id, { assignedTo: prompt("Assign to (name/email):", l.assignedTo || "") || l.assignedTo })}
                              className="text-xs font-semibold text-[#0F8B8D] hover:text-[#0B1F33]"
                            >
                              {l.assignedTo ? `Assigned: ${l.assignedTo}` : "Assign"}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {leads.length === 0 && <p className="text-sm text-[#5B6B80] py-6 text-center">No leads found. Submit via /contact to test.</p>}
              </div>
            </div>
          )}

          {tab === "applications" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33]">Applications — {apps.length} <span className="text-xs font-normal text-[#0F8B8D]">(prioritised: course graduates first)</span></h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]">
                    <tr>
                      <th className="text-left py-2 px-2">Candidate</th>
                      <th className="text-left py-2 px-2">Position</th>
                      <th className="text-left py-2 px-2">Priority</th>
                      <th className="text-left py-2 px-2">Status</th>
                      <th className="text-left py-2 px-2">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...apps].sort((a,b)=> (b.hasCompletedCourse?1:0) - (a.hasCompletedCourse?1:0)).map((a) => (
                      <tr key={a.id} className={`border-b border-[#F1F5F9] ${a.hasCompletedCourse ? "bg-amber-50/50" : ""}`}>
                        <td className="py-3 px-2">
                          <div className="font-medium text-[#0B1F33] flex items-center gap-1.5">
                            {a.fullName} {a.hasCompletedCourse && <span className="text-[10px] bg-amber-400 text-[#0B1F33] px-1.5 py-0.5 rounded-full font-bold">COURSE • PRIORITY</span>}
                          </div>
                          <div className="text-xs text-[#5B6B80]">{a.email} • {a.phone} • {a.location || ""}</div>
                          {a.courseCertificateUrl && <a href={a.courseCertificateUrl} target="_blank" className="text-xs text-[#0F8B8D] underline">Certificate</a>}
                        </td>
                        <td className="py-3 px-2 text-xs">{a.position} <div className="text-[#8A9BB0]">{a.experience || ""}</div></td>
                        <td className="py-3 px-2">
                          {a.hasCompletedCourse ? <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2 py-1 rounded-full">Prioritised</span> : <span className="text-xs text-[#8A9BB0]">Standard</span>}
                        </td>
                        <td className="py-3 px-2">
                          <select value={a.status} onChange={(e) => updateApp(a.id, { status: e.target.value })} className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white">
                            {appStatuses.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-2 text-xs max-w-[240px] truncate">{a.message || "—"}</td>
                      </tr>
                    ))}
                    {apps.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-6 text-[#5B6B80]">No applications yet — submit via /careers or /careers/apply</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "enrollments" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33]">Course Enrollments{courseInfo ? ` — KSh ${courseInfo.price?.toLocaleString()}` : ""} • {enrollments.length}</h3>
              <p className="text-xs text-[#5B6B80]">Verify M-Pesa code, mark COMPLETED to grant certificate. Graduates flagged as prioritised. Admin can mark complete, student sees certificate in portal.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs text-[#5B6B80] border-b border-[#E6EEF6]">
                    <tr>
                      <th className="text-left py-2 px-2">Student</th>
                      <th className="text-left py-2 px-2">M-Pesa</th>
                      <th className="text-left py-2 px-2">Progress</th>
                      <th className="text-left py-2 px-2">Status</th>
                      <th className="text-left py-2 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((e) => {
                      const prog = Array.isArray(e.progress) ? e.progress.filter((p: any) => p.completed).length : 0;
                      return (
                        <tr key={e.id} className="border-b border-[#F1F5F9]">
                          <td className="py-3 px-2"><div className="font-medium text-[#0B1F33]">{e.fullName}</div><div className="text-xs text-[#5B6B80]">{e.email} • {e.phone}</div><div className="text-xs text-[#8A9BB0]">{new Date(e.createdAt).toLocaleDateString()} • {e.certificateNo ? `Cert: ${e.certificateNo}` : "No cert"}</div></td>
                          <td className="py-3 px-2 text-xs">{e.mpesaCode || "—"} {e.amount ? `• KSh ${e.amount}` : ""}</td>
                          <td className="py-3 px-2 text-xs"><span className={`px-2 py-1 rounded-full font-semibold ${prog === 20 ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-[#F8FAFC] border border-[#E6EEF6]"}`}>{prog}/20 {prog === 20 ? "✓" : ""}</span></td>
                          <td className="py-3 px-2">
                            <select value={e.status} onChange={(ev) => updateEnrollment(e.id, { status: ev.target.value })} className="text-xs border border-[#E6EEF6] rounded-lg px-2 py-1.5 bg-white">
                              <option value="PENDING">PENDING</option>
                              <option value="PAID">PAID</option>
                              <option value="VERIFIED">VERIFIED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="REJECTED">REJECTED</option>
                            </select>
                            {e.hasCompletedCourse && <div className="text-xs text-emerald-600 font-semibold mt-1">✅ Completed</div>}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-1">
                              <button onClick={() => updateEnrollment(e.id, { status: "VERIFIED" })} className="text-xs px-2 py-1 rounded-full bg-[#EAF6FF] border border-[#E6EEF6] hover:bg-white">Verify</button>
                              <button onClick={() => updateEnrollment(e.id, { status: "COMPLETED", hasCompletedCourse: true })} className="text-xs px-2 py-1 rounded-full bg-emerald-500 text-white hover:bg-emerald-600">Mark Complete ✓</button>
                              {e.status === "COMPLETED" && <a href={`/api/portal/certificate?enrollmentId=${e.id}`} target="_blank" className="text-xs text-[#0F8B8D] underline">View Cert PDF</a>}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {enrollments.length === 0 && <tr><td colSpan={5} className="text-center py-6 text-[#5B6B80]">No enrollments yet — test via /course/enroll</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "course" && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
                <h3 className="font-bold text-[#0B1F33]">Course — Price & Details</h3>
                <p className="text-sm text-[#5B6B80]">Price is shown only on <span className="font-mono text-xs bg-[#F8FAFC] border px-1 py-0.5 rounded">/course</span> and <span className="font-mono text-xs bg-[#F8FAFC] border px-1 py-0.5 rounded">/course/enroll</span> — not in footer. Admin can change it here.</p>
                {courseInfo ? (
                  <div className="mt-4 space-y-4">
                    <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-4">
                      <div className="text-xs font-bold tracking-wide uppercase text-[#5B6B80]">Current</div>
                      <div className="text-sm text-[#0B1F33] mt-1"><span className="font-semibold">{courseInfo.title}</span> — KSh {courseInfo.price?.toLocaleString()} • {courseInfo.duration || ""}</div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Price (KSh) *</Label>
                        <Input type="number" min={0} value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} placeholder="1500" />
                      </div>
                      <div className="flex items-end">
                        <Button
                          size="lg"
                          onClick={async () => {
                            setCourseMsg(null);
                            const res = await fetch("/api/course", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ price: parseInt(coursePrice, 10) }) });
                            const j = await res.json();
                            if (!res.ok) setCourseMsg(j.error || "Failed");
                            else { setCourseMsg(`✅ Price updated to KSh ${j.price.toLocaleString()}`); setCourseInfo(j); }
                          }}
                        >
                          Update Price
                        </Button>
                      </div>
                    </div>
                    {courseMsg && <p className="text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-3 py-2">{courseMsg}</p>}
                    <p className="text-xs text-[#8A9BB0]">Tip: also editable via PUT /api/course with JSON {`{"price": 1500}`}. Enrollments show current price dynamically.</p>
                  </div>
                ) : (
                  <p className="text-sm text-[#5B6B80] mt-3">Loading course…</p>
                )}
              </div>

              <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
                <h3 className="font-bold text-[#0B1F33]">Module Materials — PDF / PPTX / VIDEO per module</h3>
                <p className="text-sm text-[#5B6B80]">Admin can add resources for each of the 20 modules. Portal students will see them when enrolled & paid. Upload via /api/upload (supports pdf/pptx/mp4) then link.</p>
                <form onSubmit={createMaterial} className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Module Number *</Label>
                    <select value={matForm.moduleNumber} onChange={(e) => setMatForm({ ...matForm, moduleNumber: e.target.value })} className="flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm">
                      {Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(2, "0")).map((n) => (
                        <option key={n} value={n}>Module {n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>Type *</Label>
                    <select value={matForm.type} onChange={(e) => setMatForm({ ...matForm, type: e.target.value as any })} className="flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm">
                      <option value="PDF">PDF</option>
                      <option value="PPTX">PPTX</option>
                      <option value="VIDEO">VIDEO</option>
                      <option value="LINK">LINK</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Title *</Label>
                    <Input value={matForm.title} onChange={(e) => setMatForm({ ...matForm, title: e.target.value })} placeholder="e.g. Module 01 Slides" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label>URL (upload or paste) *</Label>
                    <div className="flex gap-2">
                      <Input value={matForm.url} onChange={(e) => setMatForm({ ...matForm, url: e.target.value })} placeholder="/uploads/... or https://..." required className="flex-1" />
                      <label className="h-11 px-4 rounded-xl border border-[#E6EEF6] bg-[#F8FAFC] text-sm font-medium flex items-center cursor-pointer hover:bg-white">
                        Upload
                        <input
                          type="file"
                          accept=".pdf,.pptx,.ppt,.mp4,.webm,.mov"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (!f) return;
                            const fd = new FormData();
                            fd.append("file", f);
                            const res = await fetch("/api/upload", { method: "POST", body: fd });
                            const j = await res.json();
                            if (res.ok) setMatForm({ ...matForm, url: j.url });
                            else alert(j.error);
                          }}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-[#8A9BB0] mt-1">Upload PDF/PPTX/VIDEO (max 25MB) or paste external link.</p>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" size="lg">Add Material</Button>
                    {matMsg && <span className="ml-3 text-sm text-emerald-700">{matMsg}</span>}
                  </div>
                </form>

                <div className="mt-6 space-y-2 max-h-[400px] overflow-y-auto">
                  {materials.length === 0 ? (
                    <p className="text-sm text-[#5B6B80]">No materials yet. Add per module above.</p>
                  ) : (
                    materials.map((m) => (
                      <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] text-sm">
                        <div>
                          <div className="font-medium text-[#0B1F33]">Module {m.moduleNumber} • {m.title} <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white border border-[#E6EEF6]">{m.type}</span></div>
                          <a href={m.url} target="_blank" className="text-xs text-[#0F8B8D] hover:underline break-all">{m.url}</a>
                        </div>
                        <button onClick={() => deleteMaterial(m.id)} className="text-xs text-red-600 hover:text-red-800 font-semibold ml-2">Delete</button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0B1F33] text-white p-6">
                <h4 className="font-bold">Where price & materials appear</h4>
                <ul className="mt-2 text-sm text-white/70 space-y-1">
                  <li>• /course — hero badge & enroll card (price)</li>
                  <li>• /course/enroll — payment steps & amount</li>
                  <li>• /course/portal — gated; shows materials per module only after paid</li>
                  <li>• Admin Enrollments tab — manage status & mark complete</li>
                </ul>
              </div>
            </div>
          )}

          {tab === "services" && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
                <h3 className="font-bold text-[#0B1F33]">Services — {services.length}</h3>
                <p className="text-sm text-[#5B6B80]">Fallback to static data; admin can add with cover image via upload.</p>
                <div className="mt-4 grid gap-3">
                  {services.map((s: any) => (
                    <div key={s.slug || s.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] flex gap-4">
                      {s.coverImage && (
                        <span className="relative h-14 w-14 rounded-xl overflow-hidden shrink-0 border border-[#E6EEF6] bg-white">
                          <Image src={s.coverImage} alt={s.title} fill className="object-cover" unoptimized />
                        </span>
                      )}
                      <div>
                        <div className="font-semibold text-[#0B1F33]">{s.title || s.slug}</div>
                        <div className="text-xs text-[#5B6B80]">{s.description?.slice(0, 120)}</div>
                        <div className="text-xs text-[#8A9BB0] mt-1">{s.icon || ""} • {s.slug}</div>
                      </div>
                    </div>
                  ))}
                  {services.length === 0 && <p className="text-sm text-[#5B6B80]">No DB services — using static list. Create below.</p>}
                </div>
              </div>

              <form onSubmit={createService} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
                <h4 className="font-semibold text-[#0B1F33]">Add Service (with cover image upload)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Slug *</Label>
                    <Input value={svcForm.slug} onChange={(e) => setSvcForm({ ...svcForm, slug: e.target.value })} placeholder="my-service" required />
                  </div>
                  <div>
                    <Label>Icon</Label>
                    <Input value={svcForm.icon} onChange={(e) => setSvcForm({ ...svcForm, icon: e.target.value })} placeholder="Stethoscope" />
                  </div>
                </div>
                <div>
                  <Label>Title *</Label>
                  <Input value={svcForm.title} onChange={(e) => setSvcForm({ ...svcForm, title: e.target.value })} required />
                </div>
                <div>
                  <Label>Description *</Label>
                  <Textarea value={svcForm.description} onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })} required />
                </div>
                <ImageUpload label="Cover Image (stacked in hero)" value={svcForm.coverImage} onChange={(v) => setSvcForm({ ...svcForm, coverImage: v })} />
                {svcMsg && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">{svcMsg}</p>}
                <Button type="submit" size="lg">Create Service</Button>
              </form>
            </div>
          )}

          {tab === "blog" && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
                <h3 className="font-bold text-[#0B1F33]">Blog — {blog.length}</h3>
                <div className="mt-4 grid gap-3">
                  {blog.slice(0, 20).map((p: any) => (
                    <div key={p.slug || p.id} className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] flex gap-3">
                      {(p.coverImage || p.image) && (
                        <span className="relative h-16 w-24 rounded-xl overflow-hidden shrink-0 border border-[#E6EEF6] bg-white">
                          <Image src={p.coverImage || p.image} alt={p.title} fill className="object-cover" unoptimized />
                        </span>
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-[#0B1F33] truncate">{p.title}</div>
                        <div className="text-xs text-[#5B6B80]">{p.slug} • {p.published ? "Published" : "Draft"} • {p.coverImage ? "has cover" : "no cover"}</div>
                        <div className="text-xs text-[#8A9BB0] truncate">{p.excerpt?.slice(0, 80)}</div>
                      </div>
                    </div>
                  ))}
                  {blog.length === 0 && <p className="text-sm text-[#5B6B80]">No posts.</p>}
                </div>
              </div>

              <form onSubmit={createBlog} className="rounded-2xl bg-white border border-[#E6EEF6] p-6 space-y-4">
                <h4 className="font-semibold text-[#0B1F33]">Create Blog Post (upload featured image)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Slug *</Label>
                    <Input value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} placeholder="my-post" required />
                  </div>
                  <div className="flex items-end gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={blogForm.published} onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })} /> Published
                    </label>
                  </div>
                </div>
                <div>
                  <Label>Title *</Label>
                  <Input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <Input value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
                </div>
                <div>
                  <Label>Content *</Label>
                  <Textarea value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} rows={6} required />
                </div>
                <div>
                  <Label>Tags (comma separated)</Label>
                  <Input value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} placeholder="Medical VA, Kenya" />
                </div>
                <ImageUpload label="Featured Cover Image (shown in hero + card stack)" value={blogForm.coverImage} onChange={(v) => setBlogForm({ ...blogForm, coverImage: v })} />
                {blogMsg && <p className="text-sm bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-3 py-2">{blogMsg}</p>}
                <Button type="submit" size="lg">Create Post</Button>
                <p className="text-xs text-[#8A9BB0]">Tip: Upload a new image anytime — cards show stacked featured image, detail page uses it as hero background + large stacked gallery.</p>
              </form>
            </div>
          )}

          {tab === "testimonials" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33]">Testimonials</h3>
              <p className="text-sm text-[#5B6B80]">Manage via DB (prisma.testimonial). Static fallbacks in lib/data.ts.</p>
              <div className="mt-4 text-xs bg-[#F8FAFC] border border-[#E6EEF6] rounded-xl p-4">
                DB model: id, name, role, organization, content, rating, isActive
              </div>
            </div>
          )}

          {tab === "faqs" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33]">FAQs</h3>
              <p className="text-sm text-[#5B6B80]">Manage FAQs via DB (prisma.faq). Static fallbacks in lib/data.ts.</p>
              <div className="mt-4 text-xs bg-[#F8FAFC] border border-[#E6EEF6] rounded-xl p-4">
                DB model: question, answer, category, order, isActive
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
              <h3 className="font-bold text-[#0B1F33]">Website Settings</h3>
              <p className="text-sm text-[#5B6B80]">SiteSetting key/value store.</p>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6]">
                  <div className="font-semibold">Contact</div>
                  <div className="text-xs text-[#5B6B80]">hello@afyadesk.co.ke • +254 700 000 000 • Nairobi</div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6]">
                  <div className="font-semibold">Logo</div>
                  <div className="text-xs text-[#5B6B80] flex items-center gap-2">
                    <Image src="/logo.png" alt="logo" width={100} height={30} className="h-6 w-auto object-contain border rounded" /> /logo.png used in header/footer & /fav.jpg as favicon
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
