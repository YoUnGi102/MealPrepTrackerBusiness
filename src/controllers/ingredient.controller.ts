import { Request, Response, NextFunction } from 'express';
import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import { getIngredientsByName } from '../services/ingredient.service';

export const getIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET api/ingredients/: ${JSON.stringify(req.query)}`);

  const { name } = req.query;

  const ingredients: Ingredient[] = getIngredientsByName(name as string);

  if (ingredients) {
    res.json({ data: ingredients });
  } else {
    res.status(404).json({ message: `Ingredient ${name} not found` });
  }
};
