import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export class CustomError extends Error {
  constructor(
    public status: number = 500,
    message: string = 'Internal Server Error',
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(`[ERROR]: ${req.baseUrl} - ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
  next();
};
