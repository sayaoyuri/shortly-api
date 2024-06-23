import { Router } from 'express';
import { signIn, signUp } from '@/controllers/user-controller';
import { validateSchema } from '@/middlewares';
import { userCreateSchema, userSignInSchema } from '@/schemas';

const userRouter = Router();
userRouter
  .post('/sign-up', validateSchema(userCreateSchema), signUp)
  .post('/sign-in', validateSchema(userSignInSchema), signIn);

export { userRouter };
