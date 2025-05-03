// src/services/user.service.factory.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';
import * as userRepo from '../../repositories/user.repository';
import { User } from '../../database/entities/User';
import { ERRORS } from '../utils/errorMessages';

export const createAuthService = (dataSource: DataSource) => ({

  async register(
    username: string,
    password: string
  ): Promise<Partial<User>> {
    const existing = await userRepo.getUserByUsername(username, dataSource);
    if (existing) {
      throw ERRORS.USER.ALREADY_EXISTS(`User with username ${username} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepo.createUser(username, hashedPassword, dataSource);

    return { id: newUser.id, username: newUser.username };
  },

  async login(
    username: string,
    password: string
  ): Promise<{ token: string }> {
    const user = await userRepo.authUser(username, dataSource);
    if (!user) {
      throw ERRORS.USER.NOT_FOUND(`User with username ${username} was not found`);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw ERRORS.AUTH.INVALID_CREDENTIALS(`Credentials: {username: ${username}, password: ${password}} are invalid`);
    }

    const token = jwt.sign(
      { username: user.username, uuid: user.uuid },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    return { token };
  },
});
