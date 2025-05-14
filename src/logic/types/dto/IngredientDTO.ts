import { UserDTO } from './UserDTO';

export interface IngredientDTO {
  id: number;
  name: string;
  type: string;
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  calories: number;
  image?: string;

  barcode?: string;
  defaultAmount?: number;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  createdBy?: UserDTO;
  updatedBy?: UserDTO;
  deletedBy?: UserDTO;
}
