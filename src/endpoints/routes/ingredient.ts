import express from 'express';
import { authMiddleware } from '../../logic/middleware/auth.middleware';
import { getIngredients, postIngredient } from 'src/endpoints/controllers/ingredient.controller';
import validate from '../../logic/middleware/validation.middleware';
import { ingredientSchema } from '../../logic/validation/ingredient.schema';

const router = express.Router();

router.get('/', authMiddleware, getIngredients);
router.post('/', validate(ingredientSchema), postIngredient)

export default router;
