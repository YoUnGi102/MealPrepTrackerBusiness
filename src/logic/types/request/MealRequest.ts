import { MealIngredientRequest } from './MealIngredientRequest';

export interface MealRequest {
  name: string;
  type: string;
  portions: number;
  ingredients: MealIngredientRequest[];
  image?: string;
}
