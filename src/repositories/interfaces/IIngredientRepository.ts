import { Ingredient } from '@src/database/entities';
import { PaginatedResult } from '@src/logic/types/other/PaginatedResult';
import { IngredientDTO } from '@src/logic/types/dto/IngredientDTO';

export interface IIngredientRepository {
  addIngredient(data: Partial<Ingredient>): Promise<IngredientDTO>;
  getIngredientByBarcode(barcode: string): Promise<IngredientDTO>;
  getIngredientsPaginated(
    filter: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PaginatedResult<IngredientDTO>>;
}
