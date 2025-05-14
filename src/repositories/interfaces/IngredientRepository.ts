import { Ingredient } from '@src/database/entities';
import { PaginatedResult } from '@src/logic/types/database/PaginatedResult';

export interface IngredientRepository {
  addIngredient(data: Partial<Ingredient>): Promise<Ingredient>;
  getIngredientByBarcode(barcode: string): Promise<Ingredient>;
  getIngredientsPaginated(
    filter: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PaginatedResult<Ingredient>>;
}
