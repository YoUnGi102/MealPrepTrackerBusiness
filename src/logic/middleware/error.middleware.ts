import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

export class CustomError extends Error {
  public status: number;
  public internalMessage: string;

  constructor(
    status: number = 500,
    message: string = 'Internal Server Error',
    internalMessage?: string,
  ) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.internalMessage = internalMessage || message;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(
    `[ERROR]: ${req.method} - ${req.originalUrl} - ${err.internalMessage}`,
  );
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
  next();
};
