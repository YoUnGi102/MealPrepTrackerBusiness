import { IngredientDTO } from './IngredientDTO';
import { UserDTO } from './UserDTO';

export interface MealIngredientDTO {
  id: number;
  quantity: number;

  ingredient: IngredientDTO;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  createdBy?: UserDTO;
  updatedBy?: UserDTO;
  deletedBy?: UserDTO;
}
