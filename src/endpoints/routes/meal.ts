import express from 'express';
import { authMiddleware } from '@logic/middleware/auth.middleware';
import validate from '@logic/middleware/validation.middleware';
import { mealSchema } from '@logic/validation/meal.schema';
import { postMeal } from '../controllers/meal.controller';

const router = express.Router();

router.post('/', authMiddleware, validate(mealSchema), postMeal);

export default router;
