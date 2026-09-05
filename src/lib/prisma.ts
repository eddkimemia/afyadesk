import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const isDemoDb = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes("user:password") || process.env.DATABASE_URL.includes("localhost:5432/afyadesk");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isDemoDb ? [] : process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
