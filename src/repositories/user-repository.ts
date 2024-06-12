import { prisma } from '@/config';
import { UserBody } from '@/protocols';

async function createUser(user: UserBody) {
  return await prisma.user.create({
    data: user,
  });
}

async function readUnique(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export const userRepository = { createUser, readUnique };
