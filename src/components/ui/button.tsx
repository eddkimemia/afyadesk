import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "navy";
  size?: "sm" | "md" | "lg" | "xl";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#0F8B8D] text-white hover:bg-[#0e7a7c] shadow-sm shadow-teal-500/20 hover:shadow-md",
  navy: "bg-[#0B1F33] text-white hover:bg-[#122a44] shadow-sm",
  secondary:
    "bg-white text-[#0B1F33] border border-[#E6EEF6] hover:bg-[#F8FAFC] shadow-sm",
  outline:
    "bg-transparent border border-[#0B1F33] text-[#0B1F33] hover:bg-[#0B1F33] hover:text-white",
  ghost: "bg-transparent text-[#0B1F33] hover:bg-[#EAF6FF]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  xl: "h-[52px] px-8 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B8D] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
