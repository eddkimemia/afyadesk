"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, FileText, GraduationCap, BookOpen, Briefcase, Settings, MessageSquare, Shield, LogOut } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Applications", href: "/admin/applications", icon: Briefcase },
  { label: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  { label: "Course", href: "/admin/course", icon: BookOpen },
  { label: "Services", href: "/admin/services", icon: Shield },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "FAQs", href: "/admin/faqs", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminNav({ session }: { session: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return null;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-[240px] bg-[#0B1F33] text-white hidden md:flex flex-col shrink-0 h-screen sticky top-0 overflow-hidden">
      <div className="h-14 flex items-center gap-2 px-5 border-b border-white/10 shrink-0">
        <Image src="/logo.png" alt="AfyaDesk" width={120} height={34} className="h-7 w-auto object-contain bg-white rounded-lg p-1" />
        <span className="text-xs font-bold tracking-widest uppercase opacity-60">Admin</span>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-hidden flex flex-col">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active ? "bg-white text-[#0B1F33]" : "text-white/80 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        {session ? (
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        ) : (
          <Link href="/admin/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-white text-[#0B1F33]">
            Sign in
          </Link>
        )}
        <p className="mt-3 text-xs text-white/40 px-3">AfyaDesk Admin • Multipage</p>
      </div>
    </aside>
  );
}
