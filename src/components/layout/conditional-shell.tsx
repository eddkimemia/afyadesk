"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Chatbot, StickyMobileCTA } from "@/components/layout/chatbot";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    // Admin has its own layout — no site header/footer/chatbot
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <StickyMobileCTA />
      <div className="h-[64px] md:hidden" aria-hidden />
    </>
  );
}
