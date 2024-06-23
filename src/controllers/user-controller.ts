import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserSignInBody, UserSignUpBody } from '@/protocols';
import { userService } from '@/services';
import { sessionMiddleware } from '@/middlewares';

export async function signUp(req: Request, res: Response) {
  const user = req.body as UserSignUpBody;

  await userService.signUp(user);

  res.sendStatus(httpStatus.CREATED);
}

export async function signIn(req: Request, res: Response) {
  const user = req.body as UserSignInBody;

  const sessionToken = await userService.signIn(user);

  res.cookie('sessionToken', sessionToken, sessionMiddleware.tokenConfig());

  res.sendStatus(httpStatus.OK);
}
