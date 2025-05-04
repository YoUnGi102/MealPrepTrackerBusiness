export interface MealIngredientDTO {
  ingredientId: number;
  quantity: number;
}

export interface MealDTO {
  name: string;
  type: string;
  portions: number;
  ingredients: MealIngredientDTO[];
  image?: string;
}
