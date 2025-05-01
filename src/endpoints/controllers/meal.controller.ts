import { NextFunction, Request, Response } from 'express';
import { CustomError } from 'src/logic/middleware/error.middleware';
import logger from 'src/logic/utils/logger';
import * as mealService from '../../logic/services/meal.service'

export const postMeal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`POST api/meals/: ${JSON.stringify(req.body)}`);

  try {
    if (req.user) {
      const newIngredient = await mealService.addMeal(req.user, req.body);
      res.status(201).json(newIngredient);
    } else {
      throw new CustomError(404, 'User not found');
    }
  } catch (error) {
    next(error);
  }
};
