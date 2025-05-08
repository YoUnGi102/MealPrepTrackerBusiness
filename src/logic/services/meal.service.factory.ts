import { Meal, User } from 'src/database/entities';
import * as mealRepo from '../../dataAccess/repositories/meal.repository';
import { MealRequest } from '../types/Meal';
import { DataSource } from 'typeorm';
import { MealDTO } from '@src/dataAccess/dto/MealDTO';

export const createMealService = (dataSource: DataSource) => ({
  addMeal: async (user: User, data: MealRequest): Promise<MealDTO> => {
    return await mealRepo.addMeal(user, data, dataSource);
  },
});
