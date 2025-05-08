import logger from 'src/logic/utils/logger';
import { Ingredient, Meal, MealIngredient, User } from 'src/database/entities';
import { ERRORS } from 'src/logic/utils/errorMessages';
import { DataSource, ILike } from 'typeorm';
import { MealResponse } from '../../logic/types/response/MealResponse';
import { MealRequest } from '@src/logic/types/Meal';
import {
  PaginatedResult,
  paginateResult,
} from '@src/logic/types/typeorm/PaginatedResult';

export const getMealById = async (
  user: User,
  id: number,
  dataSource: DataSource,
) => {
  return await dataSource.getRepository(Meal).findOne({
    where: {
      id,
      createdBy: {
        id: user.id,
      },
    },
    select: {
      ingredients: true,
    },
  });
};

export const getFridgeMealsPaginated = async (
  user: User,
  filter: string,
  pageIndex: number,
  pageSize: number,
  dataSource: DataSource,
): Promise<PaginatedResult<Meal>> => {
  if (!user.fridge) {
    throw ERRORS.FRIDGE.NOT_FOUND;
  }

  const [meals, totalCount] = await dataSource
    .getRepository(Meal)
    .findAndCount({
      where: {
        name: ILike(`%${filter}%`),
        fridge: {
          id: user.fridge.id,
        },
      },
      take: pageSize,
      skip: pageIndex * pageSize,
      relations: {
        ingredients: {
          ingredient: true,
        },
      },
    });

  return paginateResult(meals, pageIndex, pageSize, totalCount);
};

export const addMeal = async (
  user: User,
  data: MealRequest,
  dataSource: DataSource,
): Promise<Meal> => {
  if (!user.fridge) {
    throw ERRORS.FRIDGE.NOT_FOUND(
      `Fridge for user ${user.id} could not be located`,
    );
  }

  return await dataSource.transaction(async (transactionalEntityManager) => {
    const ingredientRepo = transactionalEntityManager.getRepository(Ingredient);
    const mealIngredientRepo =
      transactionalEntityManager.getRepository(MealIngredient);
    const mealRepo = transactionalEntityManager.getRepository(Meal);

    // Create ingredients
    const ingredients: MealIngredient[] = await Promise.all(
      data.ingredients.map(async (mi) => {
        const ingredient = await ingredientRepo.findOneBy({
          id: mi.ingredientId,
        });
        if (!ingredient) {
          throw ERRORS.INGREDIENT.NOT_FOUND(
            `Ingredient with id ${mi.ingredientId} was not found`,
          );
        }

        const result = mealIngredientRepo.create({
          ingredient,
          quantity: mi.quantity,
          createdBy: user,
        });

        logger.info(`[MealIngredient]: Created`);
        return result;
      }),
    );

    await mealIngredientRepo.save(ingredients);

    // Create and save meal
    const meal = mealRepo.create({
      ...data,
      ingredients,
      fridge: user.fridge,
      createdBy: user,
    });

    return await mealRepo.save(meal);
  });
};
