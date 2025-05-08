import { MealIngredient, User } from '@src/database/entities';
import { Expose, Exclude, Type } from 'class-transformer';
import { IngredientResponse } from './IngredientResponse';

export class MealIngredientResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  quantity!: number;

  @Expose()
  @Type(() => IngredientResponse)
  ingredient!: IngredientResponse;

  @Expose()
  createdAt!: Date;

  @Exclude()
  updatedAt!: Date;

  @Exclude()
  deletedAt!: Date;

  @Exclude()
  createdBy!: User;

  @Exclude()
  version!: number;

  constructor(partial: Partial<MealIngredient>) {
    Object.assign(this, partial);
  }
}
