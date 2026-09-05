import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Allow login without shell
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  // Don't show nav on login page — child will handle; but we can still show minimal
  // We'll let AdminNav handle login detection via pathname on client, but server can pass session
  return <AdminNavWrapper session={session}>{children}</AdminNavWrapper>;
}

function AdminNavWrapper({ children, session }: { children: React.ReactNode; session: any }) {
  // Client nav handles active state; server just wraps
  return (
    <div className="flex min-h-screen">
      <AdminNav session={session} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-[#E6EEF6] flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs font-semibold text-[#5B6B80] hover:text-[#0B1F33]">← View Site</Link>
            <span className="h-4 w-px bg-[#E6EEF6]" />
            <span className="text-sm font-semibold text-[#0B1F33]">AfyaDesk Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <span className="hidden sm:inline text-sm text-[#5B6B80]">{session.email}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#0B1F33] text-white font-semibold">{session.role}</span>
              </>
            ) : (
              <Link href="/admin/login" className="text-sm font-semibold text-[#0F8B8D]">Login</Link>
            )}
          </div>
        </header>
        {/* mobile admin nav — horizontal, not sidebar scroll */}
        <div className="md:hidden bg-white border-b border-[#E6EEF6] px-2 py-2 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {[
              ["Dashboard","/admin"],
              ["Leads","/admin/leads"],
              ["Applications","/admin/applications"],
              ["Enrollments","/admin/enrollments"],
              ["Course","/admin/course"],
              ["Services","/admin/services"],
              ["Blog","/admin/blog"],
              ["Testimonials","/admin/testimonials"],
              ["FAQs","/admin/faqs"],
              ["Settings","/admin/settings"],
            ].map(([l,h])=>(
              <Link key={h} href={h} className="px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E6EEF6] text-xs font-medium text-[#0B1F33] whitespace-nowrap hover:bg-[#0B1F33] hover:text-white">{l}</Link>
            ))}
          </div>
        </div>
        <main className="flex-1 p-4 sm:p-6 bg-[#F8FAFC]">{children}</main>
      </div>
    </div>
  );
}
