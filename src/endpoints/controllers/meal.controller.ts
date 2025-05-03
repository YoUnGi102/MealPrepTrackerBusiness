import { NextFunction, Request, Response } from 'express';
import logger from 'src/logic/utils/logger';
import * as mealService from '../../logic/services/meal.service';
import { ERRORS } from 'src/logic/utils/errorMessages';

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
      throw ERRORS.USER.NOT_FOUND(`User ${req.user} was not found`)
    }
  } catch (error) {
    next(error);
  }
};
