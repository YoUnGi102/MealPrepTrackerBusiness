import AppDataSource from '../data-source.ts';
import { User } from '../types/entities/User.ts';

const userRepo = AppDataSource.getRepository(User);

export const getUserByUsername = async (username: string) => {
  return await userRepo.findOne({ where: { username } });
};

export const createUser = async (username: string, hashedPassword: string) => {
  const user = userRepo.create({ username, password: hashedPassword });
  return await userRepo.save(user);
};
