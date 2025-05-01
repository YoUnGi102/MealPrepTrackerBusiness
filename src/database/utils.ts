import { Macros } from 'src/logic/types/Macros';
import { MealIngredient } from './entities';

export const calculateMacros = (ingredients: MealIngredient[]): Macros => {
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

      macros.protein += (ingredient.protein * quantity) / 100;
      macros.carbs += (ingredient.carbs * quantity) / 100;
      macros.fat += (ingredient.fat * quantity) / 100;
      macros.sugar += (ingredient.sugar * quantity) / 100;
      macros.calories += (ingredient.calories * quantity) / 100;
    }
  }

  return macros;
};
