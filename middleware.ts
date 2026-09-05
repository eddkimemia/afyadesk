import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "afyadesk-super-secret-key-change-in-production-32chars!"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("afyadesk_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("afyadesk_session");
      return res;
    }
  }

  // Protect API admin routes
  if (
    (pathname.startsWith("/api/leads") && req.method === "GET") ||
    (pathname.startsWith("/api/applications") && req.method === "GET") ||
    pathname.startsWith("/api/admin")
  ) {
    const token = req.cookies.get("afyadesk_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/leads/:path*", "/api/applications/:path*", "/api/admin/:path*"],
};
