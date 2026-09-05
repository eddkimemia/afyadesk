import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm text-[#172033] placeholder:text-[#8A9BB0] focus:outline-none focus:ring-2 focus:ring-[#0F8B8D]/20 focus:border-[#0F8B8D] transition",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[110px] w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-3 text-sm text-[#172033] placeholder:text-[#8A9BB0] focus:outline-none focus:ring-2 focus:ring-[#0F8B8D]/20 focus:border-[#0F8B8D] transition",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-[#0B1F33] mb-1.5 block", className)} {...props} />;
}

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-11 w-full rounded-xl border border-[#E6EEF6] bg-white px-4 py-2 text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0F8B8D]/20 focus:border-[#0F8B8D] transition",
        className
      )}
      {...props}
    />
  );
}
