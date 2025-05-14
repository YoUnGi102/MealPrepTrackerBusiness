import { Ingredient } from '@src/database/entities';
import { Expose, Exclude } from 'class-transformer';

export class IngredientResponse {
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

  constructor(partial: Partial<Ingredient>) {
    Object.assign(this, partial);
  }
}
