import { Response, Request, NextFunction } from 'express';
import { Ingredient } from '../../logic/types/Ingredient';
import logger from '../../logic/utils/logger';
import AppDataSource from 'src/data-source';
import { createMealService } from '@src/logic/services/meal.service.factory';
import { MealResponse } from '@src/logic/types/response/MealResponse';
import { User } from '@src/database/entities';
import { ERRORS } from '@src/logic/utils/errorMessages';
import { PaginatedResult } from '@src/logic/types/typeorm/PaginatedResult';

const mealService = createMealService(AppDataSource);

export const getFridgeMeals = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET api/fridge/meals: ${JSON.stringify(req.query)}`);

  try {
    const { filter = '', pageIndex, pageSize } = req.query;

    if (!pageIndex) throw ERRORS.REQUEST.PAGE_INDEX_NOT_FOUND;
    if (!pageSize) throw ERRORS.REQUEST.PAGE_SIZE_NOT_FOUND;
    if (!req.user) throw ERRORS.AUTH.INVALID_CREDENTIALS;

    const meals: PaginatedResult<MealResponse> =
      await mealService.getFridgeMealsPaginated(
        req.user,
        filter as string,
        Number(pageIndex),
        Number(pageSize),
        AppDataSource,
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
