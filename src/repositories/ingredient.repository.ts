import { ILike } from 'typeorm';
import AppDataSource from '../data-source';
import { Ingredient } from '../database/entities/Ingredient';
import logger from 'src/logic/utils/logger';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

const getIngredientsByName = async (name: string): Promise<Ingredient[]> => {
  const ingredients = await ingredientRepo.find({
    where: {
      name: ILike(`%${name}%`)
    },
    order: { name: 'ASC' },
    take: 10
  });
  logger.info(`[Ingredients]: Found ${ingredients.length} ingredients`)
  return ingredients;
};

const addIngredient = async (data: Partial<Ingredient>): Promise<Ingredient> => {
  const ingredient = ingredientRepo.create(data);
  await ingredientRepo.save(ingredient);
  return ingredient;
}

export { getIngredientsByName, addIngredient};