import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
} from '../controllers/auth.controller';
import { authMiddleware } from '@logic/middleware/auth.middleware';
import validate from '@src/logic/middleware/validation.middleware';
import {
  userLoginSchema,
  userRegistrationSchema,
} from '@src/logic/validation/user.schema';

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: User Login
 *     responses:
 *       200:
 *         description: Authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJ1dWlkIjoiZjBmMzBhNDMtNTcxYS00MmUxLWJmNGYtZTNhZWQ5YmVmOGU5IiwiaWF0IjoxNzQ2MzUxODA5LCJleHAiOjE3NDY0MzgyMDl9.30f2EONoEwaQDz_oo1yLCcHtZGs858qbCCssXmCz8VU'
 */
router.post('/login', validate(userLoginSchema), loginUser);

router.post('/register', validate(userRegistrationSchema), registerUser);
router.post('/logout', authMiddleware, logoutUser);

export default router;
