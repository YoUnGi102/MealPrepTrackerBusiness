import { DataSource, ILike } from 'typeorm';
import { Ingredient } from '../database/entities/Ingredient';
import logger from 'src/logic/utils/logger';

const getIngredientsByName = async (name: string, dataSource: DataSource): Promise<Ingredient[]> => {
  const ingredients = await dataSource.getRepository(Ingredient).find({
    where: {
      name: ILike(`%${name}%`),
    },
    order: { name: 'ASC' },
    take: 10,
  });
  logger.info(`[Ingredients]: Found ${ingredients.length} ingredients`);
  return ingredients;
};

const addIngredient = async (
  data: Partial<Ingredient>,
  dataSource: DataSource
): Promise<Ingredient> => {
  const ingredient = dataSource.getRepository(Ingredient).create(data);
  await dataSource.getRepository(Ingredient).save(ingredient);
  return ingredient;
};

export { getIngredientsByName, addIngredient };
