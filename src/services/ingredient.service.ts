import dotenv from 'dotenv';
import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import INGREDIENTS from '../database/ingredient_database';

const getIngredients = (name: string): Ingredient[] => {
  // TODO Add code to first load ingredients from the database

  const result = INGREDIENTS.filter((ingredient: Ingredient) =>
    ingredient.name.toLowerCase().includes(name.toLowerCase()),
  );

  logger.info(result);

  return result;
};

export { getIngredients };
