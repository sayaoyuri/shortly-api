import { Session, User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type UserBody = Pick<User, 'name' | 'email' | 'password'>;

export type UserSignUpBody = UserBody & {
  confirmPassword: string;
};

export type UserSignInBody = Pick<User, 'email' | 'password'>;

export type sessionTokenData = Pick<User, 'id' | 'name' | 'email'>;

export type sessionData = Pick<Session, 'userId' | 'token'>;
