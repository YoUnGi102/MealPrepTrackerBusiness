// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { Ingredient } from '../../../database/entities/Ingredient';
import { TypeormIngredientRepository } from '../../../repositories/typeorm/ingredient.repository';
import { IIngredientRepository } from '@src/repositories/interfaces/IIngredientRepository';
import { PaginatedResult } from '../../types/other/PaginatedResult';

export const createIngredientService = (dataSource: DataSource) => {
  const ingredientRepo: IIngredientRepository = new TypeormIngredientRepository(dataSource)

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
