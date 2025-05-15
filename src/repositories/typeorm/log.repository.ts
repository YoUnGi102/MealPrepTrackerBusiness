import { Log, Meal, User } from '@src/database/entities';
import { Between, DataSource } from 'typeorm';
import { ILogRepository } from '../interfaces/ILogRepository';
import { LogDTO } from '@src/logic/types/dto/LogDTO';
import { logToDTO } from './mappers/log.mapper';

export class TypeormLogRepository implements ILogRepository {
  constructor(private dataSource: DataSource) {}

  async addLog(userId: number, mealId: number): Promise<LogDTO> {
    return await this.dataSource.transaction(async (manager) => {
      const user = await manager
        .getRepository(User)
        .findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User Not Found');
      }

      const mealRepo = manager.getRepository(Meal);
      const logRepo = manager.getRepository(Log);

      const meal = await mealRepo.findOneByOrFail({
        id: mealId,
        createdBy: user,
      });

      // Check for and decrease portions
      if (meal.portions <= 0) {
        throw new Error('No portions left to log');
      }

      await mealRepo.update({ id: meal.id }, { portions: meal.portions - 1 });

      // Create and save log
      const log = logRepo.create({
        meal,
        createdBy: user,
      });

      return logToDTO(await logRepo.save(log));
    });
  }

  async getLog(userId: number, id: number): Promise<LogDTO | null> {
    const log: Log | null = await this.dataSource.getRepository(Log).findOne({
      where: {
        id,
        createdBy: {
          id: userId,
        },
      },
      relations: {
        meal: true,
      },
    });
    return log ? logToDTO(log) : null;
  }

  async getTodayLogs(
    periodFrom: Date,
    periodUntil: Date,
    userId: number,
  ): Promise<LogDTO[]> {
    const logs: Log[] = await this.dataSource.getRepository(Log).find({
      where: {
        user: {
          id: userId,
        },
        createdAt: Between(periodFrom, periodUntil),
      },
      relations: {
        meal: true,
      },
    });
    return logs.map(logToDTO);
  }
}
