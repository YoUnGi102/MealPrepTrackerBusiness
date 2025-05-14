import { User } from '@src/database/entities';

export interface UserRepository {
  authUser(username: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  createUser(username: string, hashedPassword: string): Promise<User>;
}
