import AppDataSource from '../data-source';
import { Ingredient } from '../database/entities/Ingredient';

const ingredientRepo = AppDataSource.getRepository(Ingredient);

const getIngredientsByName = async (): Promise<Ingredient[]> => {
  const ingredients = await ingredientRepo.find({
    order: { name: 'ASC' },
  });

  return ingredients;
};

const addIngredient = async (data: Partial<Ingredient>): Promise<Ingredient> => {
  const ingredient = ingredientRepo.create(data);
  await ingredientRepo.save(ingredient);
  return ingredient;
}


export { getIngredientsByName, addIngredient};