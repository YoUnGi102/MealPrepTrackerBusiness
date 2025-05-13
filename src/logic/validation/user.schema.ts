import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
}).options({ stripUnknown: true });

export const userLoginSchema = Joi.object({
  username: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(1).max(100).required(),
}).options({ stripUnknown: true });
