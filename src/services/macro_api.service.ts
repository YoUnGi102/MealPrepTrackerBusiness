// import dotenv from 'dotenv';
// import { Ingredient } from '../models/Ingredient';
// import axios from 'axios';

// const MACRO_API_KEY = process.env.MACRO_API_KEY;
// const MACRO_API_URL = process.env.MACRO_API_URL;

// const getIngredients = (
//   name: string,
//   limit: number = 5,
//   metaInformation: boolean = true,
// ): Ingredient[] => {
//   // TODO Add code to first load ingredients from the database

//   const response: any = axios.get(
//     `${MACRO_API_URL}food/ingredients/search?query=${name}&apiKey=${MACRO_API_KEY}&number=${limit}$metaInformation=${metaInformation}`,
//   );

//   if (response.results) {
//     const ingredients: Ingredient[] = response.results.map(
//       (ingredient: any) => {
//         const weight = ingredient.nutrition.weightPerServing.amount;
//         const protein =
//         return {
//           id: ingredient.id,
//           name: ingredient.name,
//           type: ingredient.aisle,
//           protein: nutrients.find(
//             (nutrient: any) => nutrient.name === 'protein',
//           ).amount,
//           fat: ingredient.nutrition.fat,
//           carbs: ingredient.nutrition.carbs,
//           sugar: ingredient.nutrition.sugar,
//           image: ingredient.image,
//         };
//       },
//     );

//     return ingredients;
//   }

//   return [];
// };

// export { getIngredients };
