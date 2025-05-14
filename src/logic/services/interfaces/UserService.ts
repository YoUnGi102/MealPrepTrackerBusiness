// src/services/interfaces/UserService.ts
import { User } from '@src/database/entities';

export interface UserService {
  getUserByUsername(username: string): Promise<User | null>;
}
