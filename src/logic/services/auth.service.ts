import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  getUserByUsername,
  createUser,
  authUser,
} from '../../repositories/user.repository';
import { User } from '../../database/entities/User';
import logger from '../utils/logger';

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
  console.log(JSON.stringify({username, password}))
  const user = await authUser(username);
  if (!user) throw new Error('User not found');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  logger.debug(JSON.stringify({user}))

  const token = jwt.sign(
    { username: user.username, uuid: user.uuid },
    process.env.JWT_SECRET!,
    {
      expiresIn: '24h',
    },
  );

  return { token };
};
