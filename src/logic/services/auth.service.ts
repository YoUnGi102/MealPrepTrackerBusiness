import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  getUserByUsername,
  createUser,
  authUser,
} from '../../repositories/user.repository';
import { User } from '../../database/entities/User';
import { ERRORS } from '../utils/errorMessages';

export const register = async (
  username: string,
  password: string,
): Promise<Partial<User>> => {
  const existing = await getUserByUsername(username);
  if (existing) throw ERRORS.USER.ALREADY_EXISTS(`User with username ${username} already exists`)

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser(username, hashedPassword);

  return { id: newUser.id, username: newUser.username };
};

export const login = async (
  username: string,
  password: string,
): Promise<{ token: string }> => {
  const user = await authUser(username);
  if (!user) throw ERRORS.USER.NOT_FOUND(`User with username ${username} was not found`)

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw ERRORS.AUTH.INVALID_CREDENTIALS(`Credentials: {username: ${username}, password: ${password}} are invalid`);

  const token = jwt.sign(
    { username: user.username, uuid: user.uuid },
    process.env.JWT_SECRET!,
    {
      expiresIn: '24h',
    },
  );

  return { token };
};
