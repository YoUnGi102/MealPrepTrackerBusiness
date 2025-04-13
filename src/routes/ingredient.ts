import express, { NextFunction, Request, Response } from 'express';
import { Ingredient } from '../models/Ingredient';
import logger from '../utils/logger';
import { getIngredientsByName } from '../services/ingredient.service';
import { authMiddleware } from '../middleware/auth.middleware';
import { getIngredients } from 'src/controllers/ingredient.controller';

const router = express.Router();

router.get('/', authMiddleware, getIngredients);

export default router;
