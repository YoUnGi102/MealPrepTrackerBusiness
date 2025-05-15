import { MealRequest } from '../../types/request/MealRequest';
import { DataSource } from 'typeorm';
import { MealResponse } from '@src/logic/types/response/MealResponse';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../types/other/PaginatedResult';
import { IMealRepository } from '@src/repositories/interfaces/IMealRepository';
import { TypeormMealRepository } from '../../../repositories/typeorm/meal.repository';
import { UserAuth } from '@src/logic/types/request/UserAuth';
import { IUserRepository } from '@src/repositories/interfaces/IUserRepository';
import { TypeormUserRepository } from '@src/repositories/typeorm/user.repository';
import { ERRORS } from '@src/logic/utils/errorMessages';

export const createMealService = (dataSource: DataSource) => {
  const mealRepo: IMealRepository = new TypeormMealRepository(dataSource);
  const userRepo: IUserRepository = new TypeormUserRepository(dataSource);

  return {
    addMeal: async (
      user: UserAuth,
      data: MealRequest,
    ): Promise<MealResponse> => {
      const u = await userRepo.getUserByUsername(user.username);
      if (!u) {
        throw ERRORS.USER.NOT_FOUND();
      }

      const result = await mealRepo.addMeal(u.id, data);
      return plainToInstance(MealResponse, result, {
        excludeExtraneousValues: true,
      });
    },
    getFridgeMealsPaginated: async (
      user: UserAuth,
      filter: string,
      pageIndex: number,
      pageSize: number,
    ): Promise<PaginatedResult<MealResponse>> => {
      const u = await userRepo.getUserByUsername(user.username);
      if (!u) {
        throw ERRORS.USER.NOT_FOUND();
      }

      const paginatedResult = await mealRepo.getFridgeMealsPaginated(
        u.id,
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
  };
};
