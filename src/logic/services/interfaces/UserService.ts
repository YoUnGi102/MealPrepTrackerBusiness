import { UserDTO } from '@src/logic/types/dto/UserDTO';

export interface UserService {
  getUserByUsername(username: string): Promise<UserDTO | null>;
}
