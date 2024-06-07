import { ApplicationError } from '@/protocols';

export function invalidDataError(message: string = 'Invalid Data'): ApplicationError {
  return {
    name: 'InvalidDataError',
    message,
  };
}
