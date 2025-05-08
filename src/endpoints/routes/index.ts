import express from 'express';
import auth from './auth';
import ingredient from './ingredient';
import meal from './meal';
import health from './health';
import fridge from './fridge';

const router = express.Router();

router.use('/auth', auth);
router.use('/ingredients', ingredient);
router.use('/meals', meal);
router.use('/healh', health);
router.use('/fridge', fridge);

export default router;
