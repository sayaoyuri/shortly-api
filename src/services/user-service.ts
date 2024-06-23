import bcrypt from 'bcrypt';
import { conflictError, signInError } from '@/errors';
import { UserBody, UserSignInBody, UserSignUpBody } from '@/protocols';
import { userRepository } from '@/repositories';
import { sessionMiddleware } from '@/middlewares';

const PASSWORD_HASH_SALT = parseInt(process.env.PASSWORD_HASH_SALT) || 10;

function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, PASSWORD_HASH_SALT);
}

async function signUp(user: UserSignUpBody) {
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

async function signIn(user: UserSignInBody): Promise<string> {
  const existingUser = await userRepository.readUnique(user.email);
  if (!existingUser) throw signInError();

  if (!bcrypt.compareSync(user.password, existingUser.password)) throw signInError();

  const { id, name, email } = existingUser;

  const sessionToken = sessionMiddleware.generateToken({ id, name, email });

  await sessionMiddleware.saveSession({ userId: id, token: sessionToken });

  return sessionToken;
}

export const userService = { signUp, signIn, encryptPassword };
