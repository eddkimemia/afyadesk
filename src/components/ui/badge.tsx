import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-[#EAF6FF] text-[#0B1F33] border border-[#E6EEF6] px-3 py-1 text-xs font-semibold tracking-wide",
        className
      )}
      {...props}
    />
  );
}
