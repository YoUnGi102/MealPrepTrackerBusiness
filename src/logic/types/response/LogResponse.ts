import { User } from '@src/database/entities';
import { Expose, Exclude, Type } from 'class-transformer';
import { MealResponse } from './MealResponse';
import { LogDTO } from '../dto/LogDTO';

export class LogResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  @Type(() => MealResponse)
  meal!: MealResponse;

  @Expose()
  createdAt!: Date;

  @Exclude()
  updatedAt!: Date;

  @Exclude()
  deletedAt!: Date;

  @Exclude()
  createdBy!: User;

  @Exclude()
  version!: number;

  constructor(partial: Partial<LogDTO>) {
    Object.assign(this, partial);
  }
}
