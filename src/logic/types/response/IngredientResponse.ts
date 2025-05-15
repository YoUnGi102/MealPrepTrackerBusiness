import { Expose, Exclude } from 'class-transformer';
import { IngredientDTO } from '../dto/IngredientDTO';

export class IngredientResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  type!: string;

  @Expose()
  protein!: number;

  @Expose()
  fat!: number;

  @Expose()
  carbs!: number;

  @Expose()
  sugar!: number;

  @Expose()
  calories!: number;

  @Expose()
  image?: string;

  @Expose()
  barcode?: string;

  @Expose()
  defaultAmount?: string;

  @Exclude()
  version!: number;

  constructor(partial: Partial<IngredientDTO>) {
    Object.assign(this, partial);
  }
}
