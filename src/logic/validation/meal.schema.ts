import Joi from 'joi';

export const mealSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  type: Joi.string().required(),
  portions: Joi.number().positive().integer().required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        ingredientId: Joi.number().integer().positive().required(),
        quantity: Joi.number().positive().required(),
      }),
    )
    .min(1)
    .required(),
  image: Joi.string().uri().empty('').optional(),
});
