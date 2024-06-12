import Joi from 'joi';
import { UserRequest } from '@/protocols';

export const userSchema: Joi.ObjectSchema<UserRequest> = Joi.object<UserRequest>({
  name: Joi.string().min(3).max(30).trim().required(),
  email: Joi.string().email().max(100).trim().required(),
  password: Joi.string().min(6).max(25).trim().required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
});
