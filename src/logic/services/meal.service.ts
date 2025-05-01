import { Meal, User } from 'src/database/entities';
import * as mealRepo from '../../repositories/meal.repository';
import { MealDTO } from '../types/Meal';

export const addMeal = async (user: User, data: MealDTO): Promise<Meal> => {
  return await mealRepo.addMeal(user, data);
};
