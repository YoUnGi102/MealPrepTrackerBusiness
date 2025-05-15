// src/middleware/authMiddleware.factory.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERRORS } from '../utils/errorMessages';
import logger from '../utils/logger';
import { UserAuth } from '../types/request/UserAuth';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info(JSON.stringify(req.headers, null, 2));
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  try {
    if (!token) {
      throw ERRORS.AUTH.TOKEN_NOT_PROVIDED(`No token was provided`);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as UserAuth;

    if (typeof decoded !== 'object' || !('username' in decoded)) {
      throw ERRORS.AUTH.TOKEN_INVALID(`Invalid token payload`);
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
