"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, FileText, Video, Presentation, Link as LinkIcon, Award, LogOut, Download, BookOpen } from "lucide-react";

export function PortalDashboard({ enrollment, course, materials, progress }: any) {
  const [updating, setUpdating] = useState<string | null>(null);

  const progressMap = new Map(progress.map((p: any) => [p.moduleNumber, p.completed]));
  const completedCount = progress.filter((p: any) => p.completed).length;
  const total = 20;
  const pct = Math.round((completedCount / total) * 100);

  const isCompleted = enrollment.status === "COMPLETED" || enrollment.hasCompletedCourse;

  async function toggleModule(mod: string) {
    const currently = progressMap.get(mod) || false;
    setUpdating(mod);
    await fetch("/api/portal/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ moduleNumber: mod, completed: !currently }) });
    window.location.reload();
  }

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    window.location.href = "/portal/login";
  }

  async function downloadCertificate() {
    try {
      const res = await fetch("/api/portal/certificate");
      if (!res.ok) {
        const t = await res.text();
        alert(t || "Certificate not ready. Complete course and ask admin to mark complete.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // try to get filename from header
      const disp = res.headers.get("Content-Disposition");
      let filename = `AfyaDesk-Certificate-${enrollment.fullName.replace(/\s+/g, "-")}.pdf`;
      if (disp) {
        const m = disp.match(/filename="?([^"]+)"?/);
        if (m) filename = m[1];
      }
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.message || "Download failed");
    }
  }

  return (
    <div className="bg-[#F8FAFC] min-h-[70vh]">
      <div className="bg-[#0B1F33] text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-white/60">Student Portal</p>
            <h1 className="text-2xl font-bold">Welcome, {enrollment.fullName}</h1>
            <p className="text-sm text-white/70">{enrollment.email} • {course.title} • {enrollment.status}</p>
            {enrollment.certificateNo && <p className="text-xs text-white/60 mt-1">Certificate: {enrollment.certificateNo}</p>}
          </div>
          <div className="flex gap-2 items-start">
            <Link href="/course" className="h-10 px-5 rounded-full border border-white/20 text-sm font-semibold flex items-center hover:bg-white hover:text-[#0B1F33]">Course</Link>
            <button onClick={logout} className="h-10 px-5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold flex items-center gap-1.5 hover:bg-white hover:text-[#0B1F33]"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
              <div className="text-xl font-bold text-[#0B1F33]">{completedCount}/{total}</div>
              <div className="text-xs text-[#5B6B80]">Modules done</div>
            </div>
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] p-3">
              <div className="text-xl font-bold text-[#0B1F33]">{pct}%</div>
              <div className="text-xs text-[#5B6B80]">Progress</div>
            </div>
            <div className="rounded-xl bg-white border border-[#E6EEF6] p-3">
              <div className="text-sm font-bold text-[#0B1F33]">{enrollment.status}</div>
              <div className="text-xs text-[#5B6B80]">{isCompleted ? "Certificate ready" : "Complete all to certify"}</div>
            </div>
          </div>

          <div className="h-2 rounded-full bg-[#E6EEF6] overflow-hidden">
            <div className="h-full bg-[#0F8B8D]" style={{ width: `${pct}%` }} />
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-5 flex gap-4 items-center">
            <Award className="h-8 w-8 text-[#0F8B8D] shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-[#0B1F33]">Your Certificate</div>
              <div className="text-sm text-[#5B6B80]">Download your verified certificate (PDF) with name, date & director.</div>
            </div>
            <button onClick={downloadCertificate} className="h-11 px-6 rounded-full bg-[#0B1F33] text-white text-sm font-semibold flex items-center gap-2 hover:bg-black"><Download className="h-4 w-4" /> Download Certificate</button>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-[#0B1F33] flex items-center gap-2"><BookOpen className="h-5 w-5 text-[#0F8B8D]" /> 20 Modules</h2>
            {course.modules.map((m: any) => {
              const mats = materials.filter((x: any) => x.moduleNumber === m.n);
              const done = progressMap.get(m.n) || false;
              return (
                <details key={m.n} className="group rounded-2xl bg-white border border-[#E6EEF6] open:shadow-sm" open={m.n === "01"}>
                  <summary className="list-none flex gap-3 p-4 cursor-pointer items-center">
                    <span className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${done ? "bg-emerald-500 text-white" : "bg-[#0B1F33] text-white"}`}>{done ? <Check className="h-5 w-5" /> : m.n}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-[#0B1F33] text-sm">{m.title}</div>
                      <div className="text-xs text-[#5B6B80]">{mats.length} resources</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleModule(m.n);
                      }}
                      disabled={!!updating}
                      className={`h-8 px-3 rounded-full text-xs font-semibold border ${done ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-[#F8FAFC] border-[#E6EEF6] text-[#0B1F33] hover:bg-white"}`}
                    >
                      {updating === m.n ? "..." : done ? "Completed" : "Mark done"}
                    </button>
                  </summary>
                  <div className="px-4 pb-4 space-y-3">
                    {m.topics && <ul className="grid sm:grid-cols-2 gap-1">{m.topics.slice(0, 6).map((t: string) => (<li key={t} className="text-xs text-[#5B6B80] flex gap-1"><span className="text-[#0F8B8D]">•</span>{t}</li>))}</ul>}
                    {mats.length > 0 ? (
                      <div className="grid gap-2">
                        {mats.map((mat: any) => (
                          <a key={mat.id} href={mat.url} target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E6EEF6] hover:bg-white text-sm">
                            {mat.type === "PDF" ? <FileText className="h-5 w-5 text-red-500" /> : mat.type === "PPTX" ? <Presentation className="h-5 w-5 text-orange-500" /> : mat.type === "VIDEO" ? <Video className="h-5 w-5 text-[#0F8B8D]" /> : <LinkIcon className="h-5 w-5 text-[#0B1F33]" />}
                            <div className="flex-1">
                              <div className="font-medium text-[#0B1F33] text-sm">{mat.title}</div>
                              <div className="text-xs text-[#5B6B80]">{mat.type} • {mat.url}</div>
                            </div>
                            <span className="text-xs font-semibold text-[#0F8B8D]">Open →</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#8A9BB0] bg-amber-50 border border-amber-200 rounded-xl p-3">No materials yet for this module — admin will add PDF/PPTX/VIDEO. Check back soon.</p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h3 className="font-semibold text-[#0B1F33]">Your Progress</h3>
            <p className="text-sm text-[#5B6B80]">{completedCount} of {total} modules completed.</p>
            <div className="mt-4 space-y-2">
              {Array.from({ length: total }, (_, i) => String(i + 1).padStart(2, "0")).map((n) => (
                <div key={n} className="flex items-center gap-2 text-xs">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs ${progressMap.get(n) ? "bg-emerald-500 text-white" : "bg-[#F8FAFC] border border-[#E6EEF6] text-[#0B1F33]"}`}>{progressMap.get(n) ? "✓" : n}</span>
                  <span className={progressMap.get(n) ? "text-emerald-700 font-medium" : "text-[#5B6B80]"}>Module {n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0B1F33] text-white p-6">
            <h4 className="font-bold">Certificate</h4>
            {isCompleted ? (
              <>
                <p className="text-sm text-white/70 mt-2">Your certificate is ready. Includes your name, completion date and director signature.</p>
                <button onClick={downloadCertificate} className="mt-4 flex w-full h-11 rounded-full bg-white text-[#0B1F33] font-semibold text-sm items-center justify-center gap-2"><Download className="h-4 w-4" /> Download PDF</button>
                <p className="text-xs text-white/50 mt-2 text-center">No: {enrollment.certificateNo}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-white/70 mt-2">Complete all modules. Admin will then mark you as COMPLETED — certificate generates automatically with date & director.</p>
                <div className="mt-4 rounded-xl bg-white/10 border border-white/15 p-3 text-xs text-white/70">Director: Dr. Grace Wanjiku, Director — AfyaDesk</div>
              </>
            )}
          </div>

          <div className="rounded-2xl bg-white border border-[#E6EEF6] p-6">
            <h4 className="font-semibold text-[#0B1F33]">Support</h4>
            <p className="text-sm text-[#5B6B80]">hello@afyadesk.co.ke • +254 753 728 292</p>
            <Link href="/course" className="mt-3 inline-flex text-sm font-semibold text-[#0F8B8D]">Back to course →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
