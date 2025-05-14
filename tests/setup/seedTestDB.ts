import { DataSource } from 'typeorm';
import ingredients from '../fixtures/ingredients';
import { Ingredient } from '../../src/database/entities';

export async function seedTestDB(dataSource: DataSource) {
  const repo = dataSource.getRepository(Ingredient);

  await repo.clear(); // Clear existing data
  await repo.save(ingredients); // Insert fresh fixtures
}
