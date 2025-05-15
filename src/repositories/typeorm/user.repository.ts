// src/repositories/typeorm/TypeormUserRepository.ts
import { DataSource } from 'typeorm';
import { User, Fridge } from '@src/database/entities';
import { ERRORS } from '@src/logic/utils/errorMessages';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserDTO } from '@src/logic/types/dto/UserDTO';
import { userToDTO } from './mappers/user.mapper';

export class TypeormUserRepository implements IUserRepository {
  constructor(private dataSource: DataSource) {}

  async authUser(username: string): Promise<UserDTO | null> {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { username },
      select: {
        username: true,
        uuid: true,
        password: true,
      },
    });
    return user ? userToDTO(user) : null;
  }

  async getUserByUsername(username: string): Promise<UserDTO | null> {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { username },
      relations: ['fridge'],
    });
    return user ? userToDTO(user) : null;
  }

  async createUser(username: string, hashedPassword: string): Promise<UserDTO> {
    if (!username || username.trim() === '') {
      throw ERRORS.USER.USERNAME_MISSING();
    }

    if (!hashedPassword || hashedPassword.trim() === '') {
      throw ERRORS.USER.PASSWORD_MISSING();
    }

    const user = await this.dataSource.transaction(async (manager) => {
      const existing = await manager.findOne(User, { where: { username } });
      if (existing) {
        throw ERRORS.USER.ALREADY_EXISTS();
      }

      let user = manager.create(User, { username, password: hashedPassword });
      user = await manager.save(user);

      const fridge = manager.create(Fridge, {
        users: [user],
        createdBy: user,
      });
      const savedFridge = await manager.save(fridge);

      user.fridge = savedFridge;
      await manager.save(user);

      return user;
    });

    return userToDTO(user);
  }
}
