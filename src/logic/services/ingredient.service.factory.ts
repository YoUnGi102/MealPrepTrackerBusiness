// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { Ingredient } from '../../database/entities/Ingredient';
import * as ingredientRepo from '../../repositories/ingredient.repository';

export const createIngredientService = (dataSource: DataSource) => ({
  getIngredientsByName: async (name: string): Promise<Ingredient[]> => {
    const result = await ingredientRepo.getIngredientsByName(name, dataSource);
    return result;
  },

  addIngredient: async (data: Partial<Ingredient>): Promise<Ingredient> => {
    return await ingredientRepo.addIngredient(data, dataSource);
  },
});
