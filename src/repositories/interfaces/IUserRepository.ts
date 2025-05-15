import { UserDTO } from '@src/logic/types/dto/UserDTO';

export interface IUserRepository {
  authUser(username: string): Promise<UserDTO | null>;
  getUserByUsername(username: string): Promise<UserDTO | null>;
  createUser(username: string, hashedPassword: string): Promise<UserDTO>;
}
