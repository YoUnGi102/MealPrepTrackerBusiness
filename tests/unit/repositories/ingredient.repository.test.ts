/// <reference types="jest" />

import * as ingredientRepo from '../../../src/repositories/ingredient.repository';
import { TestDataSource } from '../../test-data-source';
import '../../setup/setupTestDB';
import { INGREDIENT_WITH_BARCODE, INGREDIENT_WITHOUT_BARCODE } from '../../fixtures/ingredients';
import {ERRORS} from '../../../src/logic/utils/errorMessages'

describe('Ingredient Repository - Get Paginated Ingredients', () => {
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

describe('Ingredient Repository - Get Ingredient by Barcode', ()=>{
  it('should return ingredient by the barcode', async ()=>{
    // Arrange
    const ingredientData = INGREDIENT_WITH_BARCODE;
    const barcode = ingredientData.barcode || '';
    
    // Act
    const ingredient = await ingredientRepo.getIngredientByBarcode(barcode, TestDataSource);

    // Assert
    expect(ingredient).toBeDefined();
    expect(ingredient.name).toEqual(ingredientData.name);
    expect(ingredient.protein).toEqual(ingredientData.protein);
    expect(ingredient.calories).toEqual(ingredientData.calories);
    expect(ingredient.carbs).toEqual(ingredientData.carbs);
    expect(ingredient.fat).toEqual(ingredientData.fat);
    expect(ingredient.sugar).toEqual(ingredientData.sugar);
    expect(ingredient.image).toEqual(ingredientData.image);
  })
  it('should throw error when ingredient has no barcode', async ()=>{
    // Arrange
    const ingredientData = INGREDIENT_WITHOUT_BARCODE;
    const barcode = '4893829482904';

    // Act & Assert
    expect(async () => await ingredientRepo.getIngredientByBarcode(barcode, TestDataSource))
      .rejects.toThrow(ERRORS.INGREDIENT.NOT_FOUND());
  })
})
