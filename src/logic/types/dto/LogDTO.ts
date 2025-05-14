import { UserDTO } from './UserDTO';
import { MealDTO } from './MealDTO';

export interface LogDTO {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  createdBy?: UserDTO;
  updatedBy?: UserDTO;
  deletedBy?: UserDTO;

  user: UserDTO;
  meal: MealDTO;
}
