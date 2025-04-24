import express, { Request, Response } from 'express';
import logger from '../../logic/utils/logger';

const router = express.Router();

// Health check route
router.get('/', (req: Request, res: Response) => {
  logger.info('Health check endpoint was accessed');
  res.status(200).json({ status: 'OK' });
});

export default router;
