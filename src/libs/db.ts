import { PrismaClient } from "@prisma/client";

// Define una variable global con un tipo específico
interface Global {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as unknown as Global;
const prismaClientSingleton = () => new PrismaClient();
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
