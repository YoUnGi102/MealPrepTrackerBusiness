import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {};
