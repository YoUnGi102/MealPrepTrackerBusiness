import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { CustomError } from './error.middleware';
import { getUserByUsername } from 'src/repositories/user.repository';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info(JSON.stringify(req.headers, null, 2));
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  logger.debug(token);

  if (!token) {
    res.status(400).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw new CustomError(401, 'Token could not be decoded');
    }

    logger.debug(JSON.stringify(decoded));

    if (typeof decoded === 'string' || !('username' in decoded)) {
      throw new CustomError(401, 'Invalid token payload');
    }

    const user = await getUserByUsername(decoded.username);
    logger.debug(JSON.stringify(user));
    if (user) {
      req.user = user;
    } else {
      throw new CustomError(404, 'User not found');
    }
    next();
  } catch (error) {
    next(error);
  }
};
