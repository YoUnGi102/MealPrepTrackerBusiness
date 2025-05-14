// src/repositories/typeorm/TypeormUserRepository.ts
import { DataSource } from 'typeorm';
import { User, Fridge } from '@src/database/entities';
import { ERRORS } from '@src/logic/utils/errorMessages';
import { UserRepository } from '../interfaces/UserRepository';

export class TypeormUserRepository implements UserRepository {
  constructor(private dataSource: DataSource) {}

  async authUser(username: string): Promise<User | null> {
    return await this.dataSource.getRepository(User).findOne({
      where: { username },
      select: {
        username: true,
        uuid: true,
        password: true,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.dataSource.getRepository(User).findOne({
      where: { username },
      relations: ['fridge'],
    });
  }

  async createUser(username: string, hashedPassword: string): Promise<User> {
    if (!username || username.trim() === '') {
      throw ERRORS.USER.USERNAME_MISSING();
    }

    if (!hashedPassword || hashedPassword.trim() === '') {
      throw ERRORS.USER.PASSWORD_MISSING();
    }

    return await this.dataSource.transaction(async (manager) => {
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
  }
}
