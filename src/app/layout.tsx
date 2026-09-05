import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalShell } from "@/components/layout/conditional-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "AfyaDesk — Your Healthcare Team, Virtually.",
    template: "%s | AfyaDesk",
  },
  description:
    "Kenyan medical virtual assistants for hospitals, clinics & health startups. Scheduling, reception, transcription, billing & patient support — reliable, secure, scalable.",
  keywords: [
    "medical virtual assistant Kenya",
    "healthcare virtual assistant Kenya",
    "medical receptionist Kenya",
    "medical outsourcing Kenya",
    "remote medical assistant",
    "virtual medical assistant",
  ],
  icons: {
    icon: "/fav.jpg",
    shortcut: "/fav.jpg",
    apple: "/fav.jpg",
  },
  openGraph: {
    title: "AfyaDesk — Your Healthcare Team, Virtually.",
    description: "Trained Kenyan medical virtual assistants for healthcare organizations globally.",
    type: "website",
    locale: "en_KE",
    images: [{ url: "/logo.png", width: 1200, height: 400, alt: "AfyaDesk" }],
  },
  twitter: { card: "summary_large_image", images: ["/logo.png"] },
  metadataBase: new URL("https://afyadesk.co.ke"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#172033]">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
