import { ApplicationError } from '@/protocols';

export function sessionAuthError(): ApplicationError {
  return {
    name: 'SessionAuthError',
    message: `Session not authorized!`,
  };
}
