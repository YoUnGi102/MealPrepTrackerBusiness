import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { CustomError } from './error.middleware';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.info(JSON.stringify(req.headers, null, 2));
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(400).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded){
      throw new CustomError(401, 'Token could not be decoded');
    }
    // (req as any).user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
