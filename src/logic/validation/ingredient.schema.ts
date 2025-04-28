import Joi from 'joi';

export const ingredientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().required(),
  protein: Joi.number().min(0).required(),
  fat: Joi.number().min(0).required(),
  carbs: Joi.number().min(0).required(),
  sugar: Joi.number().min(0).required(),
  calories: Joi.number().min(0).required(),
  image: Joi.string().uri().empty('').optional()
});
