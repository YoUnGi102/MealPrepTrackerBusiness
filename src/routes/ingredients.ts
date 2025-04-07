import express, { NextFunction, Request, Response } from 'express';
import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import { getIngredients } from '../services/ingredient.service';

const router = express.Router();

// Define a route to get all ingredients
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info(`GET api/ingredients/: ${JSON.stringify(req.query)}`);

  const { name } = req.query;

  const ingredients: Ingredient[] = getIngredients(name as string);

  if (ingredients) {
    res.json({ data: ingredients });
  } else {
    res.status(404).json({ message: `Ingredient ${name} not found` });
  }
});

export default router;
