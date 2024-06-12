import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';
import { UserRequest } from '@/protocols';

async function createUser(): Promise<User> {
  const user = mockUserRequest();

  return await prisma.user.create({
    data: user,
  });
}

function mockUserRequest(): UserRequest {
  const password = faker.internet.password();

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}

export const userFactory = { createUser, mockUserRequest };
