import { Macros } from '../types/core/Macros';
import { MealDTO } from '../types/dto/MealDTO';

export const calculateMacros = (meals: MealDTO[]) => {
  const macros: Macros = {
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    calories: 0,
  };

  if (meals) {
    for (const meal of meals) {
      macros.protein += meal.protein;
      macros.carbs += meal.carbs;
      macros.fat += meal.fat;
      macros.sugar += meal.sugar;
      macros.calories += meal.calories;
    }
  }

  return macros;
};
