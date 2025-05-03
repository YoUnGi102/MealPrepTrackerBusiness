import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { getUserByUsername } from 'src/repositories/user.repository';
import { ERRORS } from '../utils/errorMessages';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  logger.info(JSON.stringify(req.headers, null, 2));
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  logger.debug(`Authorization: ${token}`);

  try {

    if(!token){
      throw ERRORS.AUTH.TOKEN_NOT_PROVIDED(`No token was provided`);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw ERRORS.AUTH.TOKEN_INVALID(`Token ${token} could not be decoded`);
    }

    logger.debug(JSON.stringify(decoded));

    if (typeof decoded === 'string' || !('username' in decoded)) {
      throw ERRORS.AUTH.TOKEN_INVALID(`Invalid token payload:\n ${decoded}\nfor token - ${token}`);
    }

    const user = await getUserByUsername(decoded.username);
    logger.debug(JSON.stringify(user));
    if (user) {
      req.user = user;
    } else {
      throw ERRORS.AUTH.USER_NOT_FOUND(`User ${user} was not found`)
    }
  } catch (error) {
    next(error);
  }
};
