import { Fridge, User } from '@src/database/entities';
import { Expose, Exclude, Type } from 'class-transformer';
import { MealIngredientResponse } from './MealIngredientResponse';
import { MealDTO } from '../dto/MealDTO';

export class MealResponse {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => MealIngredientResponse)
  ingredients!: MealIngredientResponse[];

  @Expose()
  name!: string;

  @Expose()
  type!: string;

  @Expose()
  portions!: number;

  @Exclude()
  fridge!: Fridge;

  @Exclude()
  createdBy!: User;

  @Expose()
  image?: string;

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
  createdAt!: Date;

  @Exclude()
  version!: Date;

  constructor(partial: Partial<MealDTO>) {
    Object.assign(this, partial);
  }
}
