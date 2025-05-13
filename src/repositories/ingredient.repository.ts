import { DataSource, ILike } from 'typeorm';
import { Ingredient } from '../database/entities';
import logger from '../logic/utils/logger';
import {
  PaginatedResult,
  paginateResult,
} from '../logic/types/database/PaginatedResult';

const getIngredientsByName = async (
  name: string,
  dataSource: DataSource,
): Promise<Ingredient[]> => {
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
  dataSource: DataSource,
): Promise<Ingredient> => {
  const ingredient = dataSource.getRepository(Ingredient).create(data);
  await dataSource.getRepository(Ingredient).save(ingredient);
  return ingredient;
};

const getIngredientsPaginated = async (
  filter: string,
  pageIndex: number,
  pageSize: number,
  dataSource: DataSource,
): Promise<PaginatedResult<Ingredient>> => {
  const [ingredients, totalCount] = await dataSource
    .getRepository(Ingredient)
    .findAndCount({
      where: {
        name: ILike(`%${filter}%`),
      },
      take: pageSize,
      skip: pageIndex * pageSize,
    });

  return paginateResult(ingredients, pageIndex, pageSize, totalCount);
};

export { getIngredientsByName, addIngredient, getIngredientsPaginated };
