import { ApplicationError } from '@/protocols';

export function notFoundError(entity: string = 'Entity'): ApplicationError {
  return {
    name: 'NotFoundError',
    message: `${entity} Not Found`,
  };
}
