/// <reference types="jest" />

import * as ingredientRepo from '../../../src/repositories/ingredient.repository';
import { TestDataSource } from '../../test-data-source';
import '../../setup/setupTestDB';

describe('Ingredient Repository', () => {
  it('should fetch 10 ingredients', async () => {
    const filter = '';
    const pageIndex = 0;
    const pageSize = 10;
    const ingredients = await ingredientRepo.getIngredientsPaginated(
      filter,
      pageIndex,
      pageSize,
      TestDataSource,
    );

    expect(ingredients.data.length).toBeLessThanOrEqual(10);
    expect(ingredients.pageIndex).toBe(0);
    expect(ingredients.pageSize).toBe(10);
  });
});
