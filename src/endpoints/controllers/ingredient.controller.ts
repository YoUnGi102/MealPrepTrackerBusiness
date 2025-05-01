import { Response, Request, NextFunction } from 'express';
import { Ingredient } from '../../logic/types/Ingredient';
import logger from '../../logic/utils/logger';
import {
  getIngredientsByName,
  addIngredient,
} from '../../logic/services/ingredient.service';

export const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET api/ingredients/: ${JSON.stringify(req.query)}`);

  try {
    const { name } = req.query;

    const ingredients: Ingredient[] = await getIngredientsByName(
      name as string,
    );

    if (ingredients) {
      res.json({ data: ingredients });
    } else {
      res.status(404).json({ message: `Ingredient ${name} not found` });
    }
  } catch (error) {
    next(error);
  }
};

export const postIngredient = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`POST api/ingredients/: ${JSON.stringify(req.body)}`);

  try {
    const newIngredient = await addIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
