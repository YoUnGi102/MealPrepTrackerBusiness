import { LogDTO } from '@src/logic/types/dto/LogDTO';

export interface ILogRepository {
  addLog(userId: number, mealId: number): Promise<LogDTO>;
  getLog(userId: number, id: number): Promise<LogDTO | null>;
  getTodayLogs(
    periodFrom: Date,
    periodUntil: Date,
    userId: number,
  ): Promise<LogDTO[]>;
}
