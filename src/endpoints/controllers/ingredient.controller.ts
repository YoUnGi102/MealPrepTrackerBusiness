import { Response, Request, NextFunction } from 'express';
import { Ingredient } from '../../logic/types/core/Ingredient';
import logger from '../../logic/utils/logger';
import { createIngredientService } from '../../logic/services/implementations/ingredient.service.factory';
import AppDataSource from 'src/data-source';
import { PaginatedResult } from '@src/logic/types/other/PaginatedResult';

const ingredientService = createIngredientService(AppDataSource);

const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET api/ingredients/: ${JSON.stringify(req.query)}`);

  try {
    const { name } = req.query;

    const ingredients: PaginatedResult<Ingredient> =
      await ingredientService.getIngredientsByName(name as string);

    if (ingredients) {
      res.json({ data: ingredients });
    } else {
      res.status(404).json({ message: `Ingredient ${name} not found` });
    }
  } catch (error) {
    next(error);
  }
};

const getIngredientByBarcode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`GET api/ingredients/barcode/{:barcode}: ${JSON.stringify(req.params)}`)

  const {barcode} = req.params;

  try {
    const newIngredient = await ingredientService.getIngredientByBarcode(barcode);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
}

const postIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`POST api/ingredients/: ${JSON.stringify(req.body)}`);

  try {
    const newIngredient = await ingredientService.addIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};

export default {getIngredients, getIngredientByBarcode, postIngredient}
