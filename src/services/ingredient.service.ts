import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import INGREDIENTS from '../repositories/ingredient_database';

const getIngredientsByName = (name: string): Ingredient[] => {
  const result = INGREDIENTS.filter((ingredient: Ingredient) =>
    ingredient.name.toLowerCase().includes((name || '').toLowerCase()),
  );

  logger.info(result);

  return result;
};

export { getIngredientsByName };
