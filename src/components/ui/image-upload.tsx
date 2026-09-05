"use client";
import { useState } from "react";
import Image from "next/image";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
};

export function ImageUpload({ label = "Cover Image", value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      onChange(json.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value && (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-[#E6EEF6] bg-[#F8FAFC]">
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex gap-2">
        <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} disabled={uploading} className="flex-1" />
        {uploading && <span className="text-xs text-[#5B6B80] py-2">Uploading...</span>}
      </div>
      <Input placeholder="Or paste image URL (https://...)" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <p className="text-xs text-[#8A9BB0]">JPG/PNG/WEBP, max 5MB. Saved to /public/uploads — admin can replace anytime.</p>
    </div>
  );
}
