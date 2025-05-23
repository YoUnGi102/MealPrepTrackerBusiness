// TODO Create ENUM
export interface Ingredient {
  id: number;
  name: string;
  type: string;
  protein: number; // grams per 100g
  fat: number; // grams per 100g
  carbs: number; // grams per 100g
  sugar: number; // grams per 100g
  calories: number; // grams per 100g
  image?: string; // URL or file path to the image
}
