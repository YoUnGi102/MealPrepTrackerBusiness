import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', authMiddleware, logoutUser);

export default router;
