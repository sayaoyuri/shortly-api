import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';
import { UserBody, UserSignUpBody } from '@/protocols';
import { userService } from '@/services';

async function createUser(): Promise<User> {
  const mockUser = mockUserRequest();

  const user: UserBody = {
    name: mockUser.name,
    email: mockUser.email,
    password: userService.encryptPassword(mockUser.confirmPassword),
  };

  return await prisma.user.create({
    data: user,
  });
}

function mockUserRequest(): UserSignUpBody {
  const password = faker.internet.password();

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };
}

export const userFactory = { createUser, mockUserRequest };
