"use client";
import { useState } from "react";
import Link from "next/link";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { Input, Textarea, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CareerForm({ defaultPosition }: { defaultPosition?: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCourse, setHasCourse] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [certificateName, setCertificateName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleCertificateFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File too large — max 5MB (PDF, JPG, PNG, WEBP)");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/certificate-upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setCertificateUrl(json.url);
      setCertificateName(file.name);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      // reset input so same file can be re-selected if needed
      e.target.value = "";
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    // checkbox handling: FormData returns "on" if checked
    const hasCompletedCourse = hasCourse || data.hasCompletedCourse === "on" || data.hasCompletedCourse === "true";

    if (hasCompletedCourse && !certificateUrl) {
      setError("You ticked 'I've completed the course' — please upload your Course Certificate file (PDF, JPG, PNG) so we can verify and prioritise your application.");
      setLoading(false);
      return;
    }

    const payload: any = {
      ...data,
      hasCompletedCourse,
      courseCertificateUrl: certificateUrl || undefined,
    };
    // remove any stale courseCertificateUrl from FormData (we use uploaded file URL)
    // Ensure we don't send empty string
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setSuccess(true);
      form.reset();
      setHasCourse(false);
      setCertificateUrl(null);
      setCertificateName(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
        <h3 className="font-bold text-[#0B1F33]">Application received! 🎉</h3>
        <p className="mt-1 text-sm text-[#5B6B80]">We&apos;ll review your profile and get back to you within 5 business days. Course graduates are prioritised.</p>
        <Button variant="secondary" className="mt-4" onClick={() => setSuccess(false)}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Full Name *</Label>
          <Input name="fullName" required placeholder="Grace Mwangi" />
        </div>
        <div>
          <Label>Email *</Label>
          <Input name="email" type="email" required placeholder="grace@email.com" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Phone *</Label>
          <Input name="phone" required placeholder="+254 7xx xxx xxx" />
        </div>
        <div>
          <Label>Location</Label>
          <Input name="location" placeholder="Nairobi, Kenya" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Position *</Label>
          <Select name="position" required defaultValue={defaultPosition || ""}>
            <option value="">Select position</option>
            <option>Medical Virtual Assistant</option>
            <option>Medical Receptionist</option>
            <option>Medical Transcriptionist</option>
            <option>Healthcare Customer Support</option>
            <option>Medical Administrative Assistant</option>
            <option>Medical Billing Assistant</option>
          </Select>
        </div>
        <div>
          <Label>Experience</Label>
          <Select name="experience">
            <option value="">Select</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </Select>
        </div>
      </div>
      <div>
        <Label>Resume URL (optional)</Label>
        <Input name="resumeUrl" placeholder="Link to CV / Drive / LinkedIn" />
      </div>

      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-3 items-start">
        <input
          type="checkbox"
          name="hasCompletedCourse"
          id="hasCompletedCourse"
          className="mt-1 h-4 w-4 accent-[#0B1F33]"
          checked={hasCourse}
          onChange={(e) => setHasCourse(e.target.checked)}
        />
        <label htmlFor="hasCompletedCourse" className="text-sm text-[#0B1F33] leading-5">
          <span className="font-semibold">I’ve completed the AfyaDesk Readiness Course</span> — my application should be prioritised.{" "}
          <Link href="/course" className="text-[#0F8B8D] font-semibold underline" target="_blank">
            Take course
          </Link>
        </label>
      </div>
      {hasCourse && (
        <div className="rounded-xl border border-[#E6EEF6] bg-[#F8FAFC] p-4 space-y-3">
          <Label className="flex items-center gap-1.5">
            <Upload className="h-3.5 w-3.5 text-[#0F8B8D]" /> Course Certificate File *
          </Label>

          {!certificateUrl ? (
            <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E6EEF6] bg-white px-6 py-6 text-center cursor-pointer hover:border-[#0F8B8D]/40 hover:bg-[#F8FAFC] transition">
              <div className="h-10 w-10 rounded-xl bg-[#EAF6FF] border border-[#E6EEF6] flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#0F8B8D]" />
              </div>
              <div className="text-sm font-semibold text-[#0B1F33]">{uploading ? "Uploading..." : "Upload Certificate"}</div>
              <div className="text-xs text-[#5B6B80]">PDF, JPG, PNG or WEBP • Max 5MB</div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleCertificateFile}
                disabled={uploading}
              />
              {uploadError && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mt-2">{uploadError}</p>}
            </label>
          ) : (
            <div className="flex items-center gap-3 rounded-xl bg-white border border-emerald-200 p-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0B1F33] truncate">{certificateName}</div>
                <a href={certificateUrl} target="_blank" className="text-xs text-[#0F8B8D] underline truncate block">
                  {certificateUrl}
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCertificateUrl(null);
                  setCertificateName(null);
                  setUploadError(null);
                }}
                className="h-8 w-8 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] flex items-center justify-center hover:bg-red-50 hover:border-red-200 shrink-0"
                aria-label="Remove certificate"
              >
                <X className="h-4 w-4 text-[#5B6B80]" />
              </button>
            </div>
          )}

          <p className="text-xs text-[#5B6B80] leading-4">
            Upload your AfyaDesk Readiness Course certificate directly. Accepted: <span className="font-medium text-[#0B1F33]">PDF / JPG / PNG / WEBP</span> • Max 5MB. This file will be stored securely and linked to your application for prioritised review.
          </p>
          {/* hidden field ensures payload includes uploaded URL via state, but keep for FormData compatibility */}
          <input type="hidden" name="courseCertificateUrl" value={certificateUrl || ""} />
        </div>
      )}
      {!hasCourse && <input type="hidden" name="courseCertificateUrl" value="" />}

      <div>
        <Label>Tell us about yourself</Label>
        <Textarea name="message" placeholder="Briefly describe your background, skills and why you want to join AfyaDesk..." rows={4} />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}
      <Button type="submit" size="xl" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Apply to Join AfyaDesk"}
      </Button>
      <p className="text-xs text-center text-[#8A9BB0]">Course graduates are flagged and reviewed first • <Link href="/course" className="underline">Learn about course</Link></p>
    </form>
  );
}
