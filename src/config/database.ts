import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export async function clearDb(): Promise<void> {
  await prisma.url.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}
