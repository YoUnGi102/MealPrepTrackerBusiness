export interface UserDTO {
  id: number;
  uuid: string;
  username: string;
  active: boolean;
  password: string;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  fridgeId?: number;
}
