import { Fridge, User } from '@database/entities';
import { ERRORS } from '@src/logic/utils/errorMessages';
import logger from '@src/logic/utils/logger';
import { DataSource } from 'typeorm';

export const authUser = async (username: string, dataSource: DataSource) => {
  return await dataSource.getRepository(User).findOne({
    where: { username },
    select: {
      username: true,
      uuid: true,
      password: true,
    },
  });
};

export const getUserByUsername = async (
  username: string,
  dataSource: DataSource,
) => {
  return await dataSource.getRepository(User).findOne({
    where: { username },
    relations: ['fridge'],
  });
};

export const createUser = async (
  username: string,
  hashedPassword: string,
  dataSource: DataSource,
): Promise<User> => {

  logger.info({username, hashedPassword})

  // Check request parameters
  if(!username || username === '') {
    throw ERRORS.USER.USERNAME_MISSING();
  }
  if(!hashedPassword || hashedPassword === '') {
    throw ERRORS.USER.PASSWORD_MISSING();
  }

  return await dataSource.transaction(async (manager) => {

    // Check for existing User
    let checkExisting = await manager.findOne(User, {where: {username}})
    if (checkExisting){
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
};
