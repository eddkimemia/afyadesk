"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, BookOpen, Award, LogOut, GraduationCap } from "lucide-react";

export function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/portal/login" || pathname === "/course/portal/login";

  if (isLogin) return null;

  async function logout() {
    await fetch("/api/portal/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  const links = [
    { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
    { href: "/course", label: "Course", icon: BookOpen },
    { href: "/portal#certificate", label: "Certificate", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E6EEF6] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4">
        <Link href="/portal" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="AfyaDesk" width={140} height={40} className="h-8 w-auto object-contain" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase bg-[#0B1F33] text-white px-2.5 py-1 rounded-full">
            <GraduationCap className="h-3.5 w-3.5" /> Student Portal
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 ${active ? "bg-[#0B1F33] text-white" : "text-[#172033] hover:bg-[#F1F5F9]"}`}
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden sm:inline-flex h-9 px-4 rounded-full border border-[#E6EEF6] text-sm font-medium text-[#0B1F33] hover:bg-[#F8FAFC]">← Site</Link>
          <button onClick={logout} className="h-9 px-4 rounded-full bg-[#0B1F33] text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-black">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>
      {/* mobile nav */}
      <div className="md:hidden border-t border-[#E6EEF6] bg-[#F8FAFC] px-2 py-2 flex gap-1.5 overflow-x-auto">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap ${pathname === href ? "bg-[#0B1F33] text-white" : "bg-white border border-[#E6EEF6] text-[#0B1F33]"}`}>
            <Icon className="h-3.5 w-3.5" /> {label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export function PortalFooter() {
  return (
    <footer className="bg-white border-t border-[#E6EEF6] mt-8">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-3 justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="AfyaDesk" width={100} height={28} className="h-6 w-auto object-contain" />
          <span className="text-[#5B6B80]">© {new Date().getFullYear()} AfyaDesk • Student Portal</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <a href="mailto:hello@afyadesk.co.ke" className="text-[#0F8B8D] font-semibold hover:underline">hello@afyadesk.co.ke</a>
          <span className="text-[#8A9BB0]">+254 700 000 000</span>
          <Link href="/course" className="text-[#5B6B80] hover:text-[#0B1F33]">Course</Link>
          <Link href="/careers/apply" className="text-[#5B6B80] hover:text-[#0B1F33]">Apply</Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-4 text-center text-xs text-[#8A9BB0]">Non-clinical training • Certificate verifiable via admin • Need help? Contact support.</div>
    </footer>
  );
}
