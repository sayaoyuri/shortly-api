import { ApplicationError } from '@/protocols';

export function signInError(): ApplicationError {
  return {
    name: 'SignInError',
    message: 'E-mail or password invalid!',
  };
}
