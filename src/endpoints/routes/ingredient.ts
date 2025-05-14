import express from 'express';
import { authMiddleware } from '../../logic/middleware/auth.middleware';
import ingredientController from '../controllers/ingredient.controller';
import validate from '../../logic/middleware/validation.middleware';
import { ingredientAddSchema } from '../../logic/validation/ingredient.schema';

const router = express.Router();

router.get('/', authMiddleware, ingredientController.getIngredients);
router.get('/barcode/:barcode', authMiddleware, ingredientController.getIngredientByBarcode)
router.post('/', authMiddleware, validate(ingredientAddSchema), ingredientController.postIngredient);

export default router;
