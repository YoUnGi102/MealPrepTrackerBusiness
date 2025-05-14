export interface MealIngredientRequest {
  ingredientId: number;
  quantity: number;
}

export interface MealRequest {
  name: string;
  type: string;
  portions: number;
  ingredients: MealIngredientRequest[];
  image?: string;
}
