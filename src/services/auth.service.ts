import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  getUserByUsername,
  createUser,
} from '../repositories/user.repository.ts';
import { User } from '../types/entities/User';

export const register = async (
  username: string,
  password: string,
): Promise<Partial<User>> => {
  const existing = await getUserByUsername(username);
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser(username, hashedPassword);

  return { id: newUser.id, username: newUser.username };
};

export const login = async (
  username: string,
  password: string,
): Promise<{ token: string }> => {
  const user = await getUserByUsername(username);
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  });

  return { token };
};
