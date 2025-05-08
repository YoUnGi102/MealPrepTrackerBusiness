import express from 'express';
import auth from './auth';
import ingredient from './ingredient';
import meal from './meal';
import health from './health';

const router = express.Router();

router.use('/auth', auth);
router.use('/ingredients', ingredient);
router.use('/meals', meal);
router.use('/healh', health);

export default router;
