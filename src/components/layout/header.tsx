"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Course", href: "/course" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E6EEF6]">
      {/* top bar */}
      <div className="hidden md:flex bg-[#0B1F33] text-white text-xs">
        <div className="mx-auto max-w-7xl w-full px-6 flex items-center justify-between h-8">
          <span className="opacity-90">🇰🇪 Built for Healthcare in Kenya • Serving Organizations Globally</span>
          <a href="tel:+254753728292" className="flex items-center gap-1.5 hover:text-white/80">
            <Phone className="h-3 w-3" /> +254 753 728 292
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex h-[88px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0 py-2">
          <Image
            src="/logo.png"
            alt="AfyaDesk — Your Healthcare Team, Virtually."
            width={340}
            height={93}
            priority
            className="h-[46px] md:h-[60px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3.5 py-2 rounded-full text-sm font-medium text-[#172033] hover:bg-[#F1F5F9] transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/careers">
            <Button size="lg" className="rounded-full">
              Find Jobs <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/course" className="hidden xl:inline-flex">
            <Button size="lg" variant="secondary" className="rounded-full">
              View Course
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-xl border border-[#E6EEF6] bg-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#E6EEF6] bg-white">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-[#172033] hover:bg-[#F8FAFC]"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/careers" onClick={() => setOpen(false)}>
                <Button size="lg" className="w-full">
                  Find Jobs <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/course" onClick={() => setOpen(false)}>
                <Button size="lg" variant="secondary" className="w-full">
                  View Course
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
