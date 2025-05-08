import { createAuthService } from '../../../src/logic/services/auth.service.factory';
import * as ingredientRepo from '../../../src/repositories/ingredient.repository';
import { TestDataSource } from '../../test-data-source';
import { ERRORS } from '../../../src/logic/utils/errorMessages';
import logger from '../../../src/logic/utils/logger';

let authService: ReturnType<typeof createAuthService>;

beforeEach(async () => {
  await TestDataSource.initialize();
  authService = createAuthService(TestDataSource);
});

afterEach(async () => {
  await TestDataSource.destroy();
});

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

    logger.info(JSON.stringify(ingredients));

    expect(ingredients.data.length).toBeLessThanOrEqual(10);
    expect(ingredients.data.length).toEqual(ingredients.totalCount);
    expect(ingredients.pageIndex).toBe(0);
    expect(ingredients.pageSize).toBe(10);
  });
});
