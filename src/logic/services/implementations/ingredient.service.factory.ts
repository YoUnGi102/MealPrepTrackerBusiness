// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { Ingredient } from '../../../database/entities/Ingredient';
import { TypeormIngredientRepository } from '../../../repositories/typeorm/ingredient.repository';
import { IIngredientRepository } from '@src/repositories/interfaces/IIngredientRepository';
import { PaginatedResult } from '../../types/other/PaginatedResult';
import { IngredientResponse } from '@src/logic/types/response/IngredientResponse';
import { plainToInstance } from 'class-transformer';

export const createIngredientService = (dataSource: DataSource) => {
  const ingredientRepo: IIngredientRepository = new TypeormIngredientRepository(
    dataSource,
  );

  return {
    getIngredientsByName: async (
      name: string,
    ): Promise<PaginatedResult<IngredientResponse>> => {
      const result = await ingredientRepo.getIngredientsPaginated(name, 0, 10);
      return {
        ...result,
        data: result.data.map((i) =>
          plainToInstance(IngredientResponse, i, {
            excludeExtraneousValues: true,
          }),
        ),
      };
    },

    addIngredient: async (
      data: Partial<Ingredient>,
    ): Promise<IngredientResponse> => {
      const result = await ingredientRepo.addIngredient(data);
      return plainToInstance(IngredientResponse, result, {
        excludeExtraneousValues: true,
      });
    },

    getIngredientByBarcode: async (
      barcode: string,
    ): Promise<IngredientResponse> => {
      const result = await ingredientRepo.getIngredientByBarcode(barcode);
      return plainToInstance(IngredientResponse, result, {
        excludeExtraneousValues: true,
      });
    },
  };
};
