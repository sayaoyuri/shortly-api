import { Router } from 'express';
import { createUser } from '@/controllers/user-controller';
import { validateSchema } from '@/middlewares';
import { userSchema } from '@/schemas';

const userRouter = Router();
userRouter.post('/sign-up', validateSchema(userSchema), createUser);

export { userRouter };
