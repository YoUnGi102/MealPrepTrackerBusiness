import { Log } from '@src/database/entities';
import { LogDTO } from '@logic/types/dto/LogDTO';
import { userToDTO } from './user.mapper';
import { mealToDTO } from './meal.mapper';

export function logToDTO(log: Log): LogDTO {
  return {
    id: log.id,
    createdAt: log.createdAt,
    updatedAt: log.updatedAt,
    deletedAt: log.deletedAt,
    version: log.version,

    createdBy: log.createdBy ? userToDTO(log.createdBy) : undefined,
    updatedBy: log.updatedBy ? userToDTO(log.updatedBy) : undefined,
    deletedBy: log.deletedBy ? userToDTO(log.deletedBy) : undefined,

    user: userToDTO(log.user),
    meal: mealToDTO(log.meal),
  };
}
