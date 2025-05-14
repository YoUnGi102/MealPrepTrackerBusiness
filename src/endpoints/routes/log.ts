import { authMiddleware } from '@src/logic/middleware/auth.middleware';
import express from 'express';
import logController from '../controllers/log.controller'

const router = express.Router();

router.post('/', authMiddleware, logController.addLog);
router.get('/:logId', authMiddleware, logController.getLog);

export default router;