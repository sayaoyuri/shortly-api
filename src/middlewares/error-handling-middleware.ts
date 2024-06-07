import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '@/protocols';

export function handleApplicationError(
  error: ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (error.name === 'InvalidDataError') {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: error.message,
    });
  }

  if (error.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: error.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error',
  });
}
