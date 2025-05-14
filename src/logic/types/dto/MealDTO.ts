import { MealIngredientDTO } from './MealIngredientDTO';
import { UserDTO } from './UserDTO';

export interface MealDTO {
  id: number;
  name: string;
  type: string;
  portions: number;
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  calories: number;
  image?: string;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  createdBy?: UserDTO;
  ingredients: MealIngredientDTO[];
}
