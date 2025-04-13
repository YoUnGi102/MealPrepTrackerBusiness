import express, { NextFunction, Request, Response } from 'express';
import { Ingredient } from '../models/Ingredient.js';
import logger from '../utils/logger.js';
import { getIngredientsByName } from '../services/ingredient.service.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getIngredients } from 'src/controllers/ingredient.controller.ts';

const router = express.Router();

router.get('/', authMiddleware, getIngredients);

export default router;
