import { Meal, User } from 'src/database/entities';
import * as mealRepo from '../../dataAccess/repositories/meal.repository';
import { MealRequest } from '../types/Meal';
import { DataSource } from 'typeorm';
import { MealResponse } from '@src/logic/types/response/MealResponse';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../types/typeorm/PaginatedResult';

export const createMealService = (dataSource: DataSource) => ({
  addMeal: async (user: User, data: MealRequest): Promise<MealResponse> => {
    const result = await mealRepo.addMeal(user, data, dataSource);
    return plainToInstance(MealResponse, result, {
      excludeExtraneousValues: true,
    });
  },
  getFridgeMealsPaginated: async (
    user: User,
    filter: string,
    pageIndex: number,
    pageSize: number,
    dataSource: DataSource,
  ): Promise<PaginatedResult<MealResponse>> => {
    const paginatedResult = await mealRepo.getFridgeMealsPaginated(
      user,
      filter,
      pageIndex,
      pageSize,
      dataSource,
    );

    return {
      ...paginatedResult,
      data: instanceToInstance(
        paginatedResult.data.map((meal) => new MealResponse(meal)),
      ),
    };
  },
});
