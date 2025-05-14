// src/logic/mappers/mealToDTO.ts

import { Meal } from '@src/database/entities';
import { MealDTO } from '@logic/types/dto/MealDTO';
import { mealIngredientToDTO } from './mapMealIngredient';

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

    createdBy: meal.createdBy ? {
      id: meal.createdBy.id,
      uuid: meal.createdBy.uuid,
      username: meal.createdBy.username,
      active: meal.createdBy.active,
      createdAt: meal.createdBy.createdAt,
      updatedAt: meal.createdBy.updatedAt,
      deletedAt: meal.createdBy.deletedAt,
      version: meal.createdBy.version,
      fridgeId: meal.createdBy.fridge?.id,
    } : undefined,

    ingredients: meal.ingredients?.map(mealIngredientToDTO) || [],
  };
}
