import { Meal, User } from '@src/database/entities';
import { MealRequest } from '@src/logic/types/request/Meal';
import { PaginatedResult } from '@src/logic/types/database/PaginatedResult';

export interface MealRepository {
  getMealById(user: User, id: number): Promise<Meal | null>;

  getFridgeMealsPaginated(
    user: User,
    filter: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PaginatedResult<Meal>>;

  addMeal(user: User, data: MealRequest): Promise<Meal>;
}
