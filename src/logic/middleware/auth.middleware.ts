// src/middleware/authMiddleware.factory.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERRORS } from '../utils/errorMessages';
import logger from '../utils/logger';
import { UserService } from '@src/logic/services/interfaces/UserService';
import { createUserService } from '../services/implementations/user.service';
import AppDataSource from '@src/data-source';

// TODO Change - not safe / good - temporary hotfix
const userService: UserService = createUserService(AppDataSource);

export const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info(JSON.stringify(req.headers, null, 2));
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    try {
      if (!token) {
        throw ERRORS.AUTH.TOKEN_NOT_PROVIDED(`No token was provided`);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (typeof decoded !== 'object' || !('username' in decoded)) {
        throw ERRORS.AUTH.TOKEN_INVALID(`Invalid token payload`);
      }

      const user = await userService.getUserByUsername(decoded.username);
      if (!user) {
        throw ERRORS.AUTH.USER_NOT_FOUND(`User ${decoded.username} not found`);
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
