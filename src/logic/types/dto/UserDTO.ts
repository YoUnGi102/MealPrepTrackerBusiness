export interface UserDTO {
  id: number;
  uuid: string;
  username: string;
  active: boolean;

  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  version: number;

  fridgeId?: number;
}
