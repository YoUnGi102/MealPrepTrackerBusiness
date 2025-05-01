import { Ingredient } from '../../database/entities/Ingredient';
import logger from '../utils/logger';
import * as ingredientRepo from '../../repositories/ingredient.repository';

const getIngredientsByName = async (name: string): Promise<Ingredient[]> => {
  const result = await ingredientRepo.getIngredientsByName(name);
  logger.info(result.length);
  return result;
};

const addIngredient = async (
  data: Partial<Ingredient>,
): Promise<Ingredient> => {
  return await ingredientRepo.addIngredient(data);
};

export { getIngredientsByName, addIngredient };
