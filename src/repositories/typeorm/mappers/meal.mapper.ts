// src/logic/mappers/mealToDTO.ts

import { Meal } from '@src/database/entities';
import { MealDTO } from '@logic/types/dto/MealDTO';
import { mealIngredientToDTO } from './mealIngredient.mapper';
import { userToDTO } from './user.mapper';

export const mealToDTO = (meal: Meal): MealDTO => {
  return {
    id: meal.id,
    name: meal.name,
    type: meal.type,
    portions: meal.portions,
    protein: meal.protein,
    fat: meal.fat,
    carbs: meal.carbs,
    sugar: meal.sugar,
    calories: meal.calories,
    image: meal.image,

    createdAt: meal.createdAt,
    updatedAt: meal.updatedAt,
    deletedAt: meal.deletedAt,
    version: meal.version,

    createdBy: meal.createdBy ? userToDTO(meal.createdBy) : undefined,
    ingredients: meal.ingredients?.map(mealIngredientToDTO) || [],
  };
};
