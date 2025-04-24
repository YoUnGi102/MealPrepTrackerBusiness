import express from 'express';
import auth from './auth';
import ingredient from './ingredient';

const router = express.Router();

router.use('/auth', auth);
router.use('/ingredients', ingredient);

export default router;
