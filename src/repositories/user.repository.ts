import { Fridge, User } from 'src/database/entities';
import AppDataSource from '../data-source';

const userRepo = AppDataSource.getRepository(User);
const fridgeRepo = AppDataSource.getRepository(Fridge);

export const authUser = async (username: string) => {
  return await userRepo.findOne({
    where: {username},
    select: {
      username: true,
      uuid: true,
      password: true
    }
  })
}

export const getUserByUsername = async (username: string) => {
  return await userRepo.findOne({
    where: { username },
    relations: ['fridge'],
  });
};

export const createUser = async (username: string, hashedPassword: string): Promise<User> => {
  return await AppDataSource.transaction(async (manager) => {
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
