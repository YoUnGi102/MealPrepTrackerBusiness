import { TypeormUserRepository } from '@src/repositories/typeorm/user.repository';
import { DataSource } from 'typeorm';
import { UserService } from '../interfaces/UserService';
import { UserDTO } from '@src/logic/types/dto/UserDTO';

export const createUserService = (dataSource: DataSource): UserService => {
  const userRepo = new TypeormUserRepository(dataSource);
  return {
    getUserByUsername: async (username: string): Promise<UserDTO | null> => {
      return await userRepo.getUserByUsername(username);
    },
  };
};
