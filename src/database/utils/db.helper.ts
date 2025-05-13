import { Macros } from "@src/logic/types/Macros";
import { MealIngredient } from "../entities";

export const calculateMacros = (portions: number, ingredients: MealIngredient[]): Macros => {
  const macros: Macros = {
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    calories: 0,
  };

  if (ingredients) {
    for (const mi of ingredients) {
      const ingredient = mi.ingredient;
      const quantity = mi.quantity;

      macros.protein += (ingredient.protein * quantity / portions) / 100;
      macros.carbs += (ingredient.carbs * quantity / portions) / 100;
      macros.fat += (ingredient.fat * quantity / portions) / 100;
      macros.sugar += (ingredient.sugar * quantity / portions) / 100;
      macros.calories += (ingredient.calories * quantity / portions) / 100;
    }
  }

  return macros;
};
