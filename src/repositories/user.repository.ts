import AppDataSource from '../data-source';
import { User } from '../database/entities/User';

const userRepo = AppDataSource.getRepository(User);

export const getUserByUsername = async (username: string) => {
  return await userRepo.findOne({ where: { username } });
};

export const createUser = async (username: string, hashedPassword: string) => {
  const user = userRepo.create({ username, password: hashedPassword });
  return await userRepo.save(user);
};
