// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { Ingredient } from '../../../database/entities/Ingredient';
import { TypeormIngredientRepository } from '../../../repositories/implementations/ingredient.repository';
import { IngredientRepository } from '@src/repositories/interfaces/IngredientRepository';
import { PaginatedResult } from '../../types/database/PaginatedResult';

export const createIngredientService = (dataSource: DataSource) => {
  const ingredientRepo: IngredientRepository = new TypeormIngredientRepository(dataSource)

  return {
    getIngredientsByName: async (name: string): Promise<PaginatedResult<Ingredient>> => {
      const result = await ingredientRepo.getIngredientsPaginated(name, 0, 10);
      return result;
    },

    addIngredient: async (data: Partial<Ingredient>): Promise<Ingredient> => {
      return await ingredientRepo.addIngredient(data);
    },

    getIngredientByBarcode: async(barcode: string): Promise<Ingredient> => {
      return await ingredientRepo.getIngredientByBarcode(barcode);
    }
  }
};
