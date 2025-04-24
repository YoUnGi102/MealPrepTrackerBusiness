import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../../endpoints/controllers/auth.controller';
import { authMiddleware } from '../../logic/middleware/auth.middleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', authMiddleware, logoutUser);

export default router;
