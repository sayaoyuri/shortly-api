import { Session } from '@prisma/client';
import { prisma } from '@/config';
import { sessionData } from '@/protocols';

async function createToken(token: sessionData): Promise<Session> {
  return await prisma.session.create({ data: token });
}

async function readUnique(token: string): Promise<Session> {
  return await prisma.session.findUnique({
    where: { token },
  });
}

export const sessionRepository = { createToken, readUnique };
