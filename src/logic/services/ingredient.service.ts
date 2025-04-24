import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import * as ingredientRepo from '../../repositories/ingredient.repository' ;
import INGREDIENTS from '../../repositories/ingredient_database';

const getIngredientsByName = (name: string): Ingredient[] => {
  const result = INGREDIENTS.filter((ingredient: Ingredient) =>
    ingredient.name.toLowerCase().includes((name || '').toLowerCase()),
  );

  logger.info(result);

  return result;
};


const addIngredient = async (data: Partial<Ingredient>): Promise<Ingredient> => {
  return await ingredientRepo.addIngredient(data);
}


export { getIngredientsByName, addIngredient };