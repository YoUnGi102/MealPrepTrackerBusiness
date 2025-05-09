// // test/setupTestDB.ts
// import { TestDataSource } from '../test-data-source';
// import { User, Fridge, Meal, Ingredient } from '../../src/database/entities';
// import ingredientsData from '../config/ingredients'

// export const setupTestDB = async () => {
//   if (!TestDataSource.isInitialized) {
//     await TestDataSource.initialize();
//   }

//   const entities = TestDataSource.entityMetadatas;
//   for (const entity of entities) {
//     const repository = TestDataSource.getRepository(entity.name);
//     await repository.clear();
//   }

//   const fridge = TestDataSource.getRepository(Fridge).create()

//   const user = TestDataSource.getRepository(User).create({
//     email: 'test',
//     password; 'test'
//   })

//   const ingredients = [];
//   for(const ingredientRequest of ingredientsData){
//     ingredients = ingredients.push(await ingredientRequest.create({}))
//   }

//   return {  };
// };
