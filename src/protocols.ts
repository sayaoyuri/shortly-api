import { Session, User } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
};

export type UserBody = Pick<User, 'name' | 'email' | 'password'>;

export type UserRequest = UserBody & {
  confirmPassword: string;
};

export type sessionTokenData = Pick<User, 'id' | 'name' | 'email'>;

export type sessionData = Pick<Session, 'userId' | 'token'>;
