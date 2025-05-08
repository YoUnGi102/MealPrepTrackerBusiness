import logger from 'src/logic/utils/logger';
import { Ingredient, Meal, MealIngredient, User } from 'src/database/entities';
import { ERRORS } from 'src/logic/utils/errorMessages';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { MealDTO } from '../dto/MealDTO';
import { MealRequest } from '@src/logic/types/Meal';

export const getMealById = async (id: number, dataSource: DataSource) => {
  return await dataSource.getRepository(Meal).findOne({
    where: {
      id,
    },
    select: {
      ingredients: true,
    },
  });
};

export const addMeal = async (
  user: User,
  data: MealRequest,
  dataSource: DataSource,
) => {
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

    const result = await mealRepo.save(meal);
    logger.info(JSON.stringify(result));
    return plainToInstance(MealDTO, result, { excludeExtraneousValues: true });
  });
};
