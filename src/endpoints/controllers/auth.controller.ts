import { NextFunction, Request, Response } from 'express';
import {createAuthService} from '../../logic/services/auth.service.factory';
import AppDataSource from 'src/data-source';
import logger from '../../logic/utils/logger';

const authService = createAuthService(AppDataSource);

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info('Registering user', req.body);
  try {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`POST /api/auth/login - ${JSON.stringify(req.body)}`);
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
