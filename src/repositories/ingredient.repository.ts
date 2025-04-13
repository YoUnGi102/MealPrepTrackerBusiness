import AppDataSource from '../data-source';
import { Ingredient } from '../types/entities/Ingredient';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

const getIngredientsByName = async (): Promise<Ingredient[]> => {
  const ingredients = await ingredientRepo.find({
    order: { name: 'ASC' },
  });

  return ingredients;
};

export { getIngredientsByName };
