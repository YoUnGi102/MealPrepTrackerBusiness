import { MealIngredient } from '@src/database/entities';
import { MealIngredientDTO } from '@src/logic/types/dto/MealIngredientDTO';
import { ingredientToDTO } from './ingredient.mapper';
import { userToDTO } from './user.mapper';

export const mealIngredientToDTO = (mi: MealIngredient): MealIngredientDTO => {
  return {
    id: mi.id,
    quantity: mi.quantity,

    createdAt: mi.createdAt,
    updatedAt: mi.updatedAt,
    deletedAt: mi.deletedAt,
    version: mi.version,

    ingredient: ingredientToDTO(mi.ingredient),

    createdBy: mi.createdBy ? userToDTO(mi.createdBy) : undefined,
    updatedBy: mi.updatedBy ? userToDTO(mi.updatedBy) : undefined,
    deletedBy: mi.deletedBy ? userToDTO(mi.deletedBy) : undefined,
  };
};
