import { NextFunction, Request, Response } from 'express';
import { register, login } from '../services/auth.service';
import logger from '../utils/logger';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info('Registering user', req.body);
  try {
    const { username, password } = req.body;
    const user = await register(username, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err: any) {
    logger.error('Error registering user', err);
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logoutUser = (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
