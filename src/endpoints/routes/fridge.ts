import express from 'express';
import { authMiddleware } from '@logic/middleware/auth.middleware';
import { getFridgeMeals } from '../controllers/fridge.controller';

const router = express.Router();

router.get('/meals', authMiddleware, getFridgeMeals);

export default router;
