// src/data-source/test-data-source.ts
import { DataSource } from 'typeorm';
import {
  User,
  Fridge,
  Ingredient,
  Meal,
  MealIngredient,
  Log,
  AuditableEntityUUID,
  AuditableEntity,
} from '../src/database/entities';

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  synchronize: true,
  entities: [
    User,
    Ingredient,
    Log,
    MealIngredient,
    Meal,
    Fridge,
    AuditableEntityUUID,
    AuditableEntity,
  ],
  logging: false,
});
