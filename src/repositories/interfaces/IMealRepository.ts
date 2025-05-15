import { MealRequest } from '@src/logic/types/request/MealRequest';
import { PaginatedResult } from '@src/logic/types/other/PaginatedResult';
import { MealDTO } from '@src/logic/types/dto/MealDTO';

export interface IMealRepository {
  getMealById(userId: number, id: number): Promise<MealDTO | null>;

  getFridgeMealsPaginated(
    userId: number,
    filter: string,
    pageIndex: number,
    pageSize: number,
  ): Promise<PaginatedResult<MealDTO>>;

  addMeal(userId: number, data: MealRequest): Promise<MealDTO>;
}
