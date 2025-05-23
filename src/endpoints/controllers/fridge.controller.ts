import { Response, Request, NextFunction } from 'express';
import logger from '@logic/utils/logger';
import AppDataSource from '@src/data-source';
import { createMealService } from '@logic/services/implementations/meal.service.factory';
import { MealResponse } from '@logic/types/response/MealResponse';
import { ERRORS } from '@logic/utils/errorMessages';
import { PaginatedResult } from '@logic/types/other/PaginatedResult';

const mealService = createMealService(AppDataSource);

export const getFridgeMeals = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET api/fridge/meals: ${JSON.stringify(req.query)}`);

  try {
    const { filter = '', pageIndex, pageSize } = req.query;

    if (!pageIndex) {
      throw ERRORS.REQUEST.PAGE_INDEX_NOT_FOUND();
    }
    if (!pageSize) {
      throw ERRORS.REQUEST.PAGE_SIZE_NOT_FOUND();
    }
    if (!req.user) {
      throw ERRORS.AUTH.INVALID_CREDENTIALS();
    }

    const meals: PaginatedResult<MealResponse> =
      await mealService.getFridgeMealsPaginated(
        req.user,
        filter as string,
        Number(pageIndex),
        Number(pageSize),
      );

    if (meals) {
      res.json(meals);
    } else {
      throw ERRORS.MEAL.NOT_FOUND;
    }
  } catch (error) {
    next(error);
  }
};
