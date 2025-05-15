import { User } from '@src/database/entities';
import { UserDTO } from '@logic/types/dto/UserDTO';

export const userToDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    uuid: user.uuid,
    username: user.username,
    active: user.active,
    password: user.password,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
    version: user.version,

    fridgeId: user.fridge?.id,
  };
};
