import { Fridge, Meal, User } from '@src/database/entities';
import { Expose, Exclude, Type } from 'class-transformer';
import { MealIngredientDTO } from './MealIngredientDTO';

export class MealDTO {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => MealIngredientDTO)
  ingredients!: MealIngredientDTO[];

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

  constructor(partial: Partial<Meal>) {
    Object.assign(this, partial);
  }
}
