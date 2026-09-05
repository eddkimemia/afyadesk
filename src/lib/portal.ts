import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "afyadesk-super-secret-key-change-in-production-32chars!"
);
export const PORTAL_COOKIE = "afyadesk_portal";

export type PortalSession = {
  enrollmentId: string;
  email: string;
  fullName: string;
  status: string;
};

export async function createPortalSession(payload: PortalSession) {
  const token = await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
  const jar = await cookies();
  jar.set(PORTAL_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return token;
}

export async function getPortalSession(): Promise<PortalSession | null> {
  const jar = await cookies();
  const token = jar.get(PORTAL_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as PortalSession;
  } catch {
    return null;
  }
}

export async function destroyPortalSession() {
  const jar = await cookies();
  jar.delete(PORTAL_COOKIE);
}

export async function verifyPortalToken(token: string): Promise<PortalSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as PortalSession;
  } catch {
    return null;
  }
}
