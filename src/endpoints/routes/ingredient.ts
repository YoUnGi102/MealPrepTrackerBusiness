import express from 'express';
import { authMiddleware } from '../../logic/middleware/auth.middleware';
import {
  getIngredients,
  postIngredient,
} from 'src/endpoints/controllers/ingredient.controller';
import validate from '../../logic/middleware/validation.middleware';
import { ingredientAddSchema } from '../../logic/validation/ingredient.schema';

const router = express.Router();

router.get('/', authMiddleware, getIngredients);
router.post('/', authMiddleware, validate(ingredientAddSchema), postIngredient);

export default router;
