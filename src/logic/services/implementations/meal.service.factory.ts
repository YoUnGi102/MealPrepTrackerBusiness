import { User } from 'src/database/entities';
import { MealRequest } from '../../types/request/MealRequest';
import { DataSource } from 'typeorm';
import { MealResponse } from '@src/logic/types/response/MealResponse';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../types/other/PaginatedResult';
import { IMealRepository } from '@src/repositories/interfaces/IMealRepository';
import { TypeormMealRepository } from '../../../repositories/typeorm/meal.repository';

export const createMealService = (dataSource: DataSource) => {
  const mealRepo: IMealRepository = new TypeormMealRepository(dataSource);

  return {
    addMeal: async (user: User, data: MealRequest): Promise<MealResponse> => {
      const result = await mealRepo.addMeal(user, data);
      return plainToInstance(MealResponse, result, {
        excludeExtraneousValues: true,
      });
    },
    getFridgeMealsPaginated: async (
      user: User,
      filter: string,
      pageIndex: number,
      pageSize: number,
    ): Promise<PaginatedResult<MealResponse>> => {
      const paginatedResult = await mealRepo.getFridgeMealsPaginated(
        user,
        filter,
        pageIndex,
        pageSize,
      );

      return {
        ...paginatedResult,
        data: instanceToInstance(
          paginatedResult.data.map((meal) => new MealResponse(meal)),
        ),
      };
    },
  }
}
