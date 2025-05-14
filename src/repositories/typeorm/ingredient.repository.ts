import { DataSource, ILike } from 'typeorm';
import { Ingredient } from '@src/database/entities';
import { IIngredientRepository } from '../interfaces/IIngredientRepository';
import { PaginatedResult } from '@src/logic/types/other/PaginatedResult';
import { getPaginatedResult } from '@src/repositories/typeorm/paginatedResult';
import logger from '@src/logic/utils/logger';
import { ERRORS } from '@src/logic/utils/errorMessages';

export class TypeormIngredientRepository implements IIngredientRepository {
  constructor(private dataSource: DataSource) {}

  async addIngredient(data: Partial<Ingredient>): Promise<Ingredient> {
    const repo = this.dataSource.getRepository(Ingredient);
    const ingredient = repo.create(data);
    await repo.save(ingredient);
    return ingredient;
  }

  async getIngredientByBarcode(barcode: string): Promise<Ingredient> {
    const repo = this.dataSource.getRepository(Ingredient);
    const ingredient = await repo.findOne({ where: { barcode } });

    if (!ingredient) {
      throw ERRORS.INGREDIENT.NOT_FOUND(`No ingredient with barcode: "${barcode}" found`);
    }

    logger.info(`[Ingredient]: Found ${ingredient.name} with barcode ${barcode}`);
    return ingredient;
  }

  async getIngredientsPaginated(
    filter: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PaginatedResult<Ingredient>> {
    const where = { name: ILike(`%${filter}%`) };
    const repo = this.dataSource.getRepository(Ingredient);

    return getPaginatedResult(pageIndex, pageSize, where, null, repo);
  }
}
