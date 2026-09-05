import path from "path";
import { mkdir, readFile, writeFile } from "fs/promises";

export async function demoFilePath() {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  return path.join(dir, "enrollments-demo.json");
}

export async function readDemoEnrollments(): Promise<any[]> {
  try {
    const fp = await demoFilePath();
    const raw = await readFile(fp, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeDemoEnrollments(arr: any[]) {
  const fp = await demoFilePath();
  await writeFile(fp, JSON.stringify(arr, null, 2));
}

export async function findDemoEnrollmentById(id: string) {
  const arr = await readDemoEnrollments();
  return arr.find((x: any) => x.id === id) || null;
}

export async function findDemoEnrollmentByEmailPhone(email: string, phone: string) {
  const arr = await readDemoEnrollments();
  const clean = (s: string) => s.replace(/\D/g, "").slice(-9);
  const targetPhone = clean(phone);
  // find most recent by email (case-insensitive) matching phone last 9 digits if possible, else just email
  const candidates = arr.filter((x: any) => x.email?.toLowerCase() === email.toLowerCase());
  if (!candidates.length) return null;
  // prefer phone match
  const exact = candidates.find((x: any) => clean(x.phone) === targetPhone);
  if (exact) return exact;
  // fallback to most recent by email
  candidates.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return candidates[0];
}

export function isDbAuthError(e: any) {
  const msg = e?.message || "";
  return e?.code === "P1001" || e?.name === "PrismaClientInitializationError" || msg.includes("Environment variable") || msg.includes("Can't reach") || msg.includes("Authentication failed") || msg.includes("database server");
}
