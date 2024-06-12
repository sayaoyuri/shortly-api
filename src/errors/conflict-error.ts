import { ApplicationError } from '@/protocols';

export function conflictError(entity: string = 'Entity'): ApplicationError {
  return {
    name: 'ConflictError',
    message: `${entity} already exists!`,
  };
}
