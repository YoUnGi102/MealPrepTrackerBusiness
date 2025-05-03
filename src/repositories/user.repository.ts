import { Fridge, User } from 'src/database/entities';
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

export const getUserByUsername = async (username: string, dataSource: DataSource) => {
  return await dataSource.getRepository(User).findOne({
    where: { username },
    relations: ['fridge'],
  });
};

export const createUser = async (
  username: string,
  hashedPassword: string, dataSource: DataSource
): Promise<User> => {
  return await dataSource.transaction(async (manager) => {
    let user = manager.create(User, { username, password: hashedPassword });
    user = await manager.save(user);

    const fridge = manager.create(Fridge, {
      users: [user],
      createdBy: user,
    });
    const savedFridge = await manager.save(fridge); // now fridge has ID

    user.fridge = savedFridge;
    await manager.save(user);

    return user;
  });
};
