import { Ingredient } from '@src/database/entities';
import { IngredientDTO } from '@logic/types/dto/IngredientDTO';
import { userToDTO } from './user.mapper';

export const ingredientToDTO = (ingredient: Ingredient): IngredientDTO => {
  return {
    id: ingredient.id,
    name: ingredient.name,
    type: ingredient.type,
    protein: ingredient.protein,
    fat: ingredient.fat,
    carbs: ingredient.carbs,
    sugar: ingredient.sugar,
    calories: ingredient.calories,
    image: ingredient.image,
    barcode: ingredient.barcode,
    defaultAmount: ingredient.defaultAmount,

    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
    deletedAt: ingredient.deletedAt,
    version: ingredient.version,

    createdBy: ingredient.createdBy
      ? userToDTO(ingredient.createdBy)
      : undefined,
    updatedBy: ingredient.updatedBy
      ? userToDTO(ingredient.updatedBy)
      : undefined,
    deletedBy: ingredient.deletedBy
      ? userToDTO(ingredient.deletedBy)
      : undefined,
  };
};
