import { NextFunction, Request, Response } from 'express';
import logger from '@src/logic/utils/logger';
import { createMealService } from '@logic/services/implementations/meal.service.factory';
import { ERRORS } from '@src/logic/utils/errorMessages';
import AppDataSource from '@src/data-source';

const mealService = createMealService(AppDataSource);

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
      throw ERRORS.USER.NOT_FOUND(`User ${req.user} was not found`);
    }
  } catch (error) {
    next(error);
  }
};
