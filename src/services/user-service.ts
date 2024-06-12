import bcrypt from 'bcrypt';
import { conflictError } from '@/errors';
import { UserBody, UserRequest } from '@/protocols';
import { userRepository } from '@/repositories';

const PASSWORD_HASH_SALT = parseInt(process.env.PASSWORD_HASH_SALT) || 10;

function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, PASSWORD_HASH_SALT);
}

async function createUser(user: UserRequest) {
  const existingUser = await userRepository.readUnique(user.email);
  if (existingUser) throw conflictError('E-mail');

  const newUser: UserBody = {
    name: user.name,
    email: user.email,
    password: encryptPassword(user.password),
  };

  const createdUser = await userRepository.createUser(newUser);

  return createdUser;
}

export const userService = { createUser, encryptPassword };
