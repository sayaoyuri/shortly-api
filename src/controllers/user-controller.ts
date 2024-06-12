import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserRequest } from '@/protocols';
import { userService } from '@/services';

export async function createUser(req: Request, res: Response) {
  const user = req.body as UserRequest;

  await userService.createUser(user);

  res.sendStatus(httpStatus.CREATED);
}
