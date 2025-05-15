// src/repositories/meal.repository.ts

import { ILike, DataSource } from 'typeorm';
import { Ingredient, Meal, MealIngredient, User } from '@src/database/entities';
import { MealRequest } from '@src/logic/types/request/MealRequest';
import { PaginatedResult } from '@src/logic/types/other/PaginatedResult';
import { getPaginatedResult } from './paginatedResult';
import logger from '@src/logic/utils/logger';
import { ERRORS } from '@src/logic/utils/errorMessages';
import { MealDTO } from '@src/logic/types/dto/MealDTO';
import { mealToDTO } from './mappers/meal.mapper';

export class TypeormMealRepository {
  constructor(private dataSource: DataSource) {}

  async getMealById(userId: number, id: number): Promise<MealDTO | null> {
    const meal = await this.dataSource.getRepository(Meal).findOne({
      where: {
        id,
        createdBy: {
          id: userId,
        },
      },
      select: {
        ingredients: true,
      },
    });
    return meal ? mealToDTO(meal) : null;
  }

  async getFridgeMealsPaginated(
    userId: number,
    filter: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<PaginatedResult<MealDTO>> {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: userId }, relations: { fridge: true } });
    if (!user) {
      throw new Error('User Not Found');
    }

    if (!user.fridge) {
      throw ERRORS.FRIDGE.NOT_FOUND();
    }

    const where = {
      name: ILike(`%${filter}%`),
      fridge: {
        id: user.fridge.id,
      },
    };

    const relations = {
      ingredients: {
        ingredient: true,
      },
    };

    return getPaginatedResult(
      pageIndex,
      pageSize,
      where,
      relations,
      this.dataSource.getRepository(Meal),
      mealToDTO,
    );
  }

  async addMeal(userId: number, data: MealRequest): Promise<MealDTO> {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User Not Found');
    }

    if (!user.fridge) {
      throw ERRORS.FRIDGE.NOT_FOUND(
        `Fridge for user ${user.id} could not be located`,
      );
    }

    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const ingredientRepo =
          transactionalEntityManager.getRepository(Ingredient);
        const mealIngredientRepo =
          transactionalEntityManager.getRepository(MealIngredient);
        const mealRepo = transactionalEntityManager.getRepository(Meal);

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

        const meal = mealRepo.create({
          ...data,
          ingredients,
          fridge: user.fridge,
          createdBy: user,
        });

        return mealToDTO(await mealRepo.save(meal));
      },
    );
  }
}
