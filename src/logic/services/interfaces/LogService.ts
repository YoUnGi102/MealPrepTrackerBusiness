import { LogResponse } from '@src/logic/types/response/LogResponse';
import { PeriodLog } from '@src/logic/types/other/PeriodLog';
import { UserAuth } from '@src/logic/types/request/UserAuth';

export interface ILogService {
  addLog(user: UserAuth, mealId: number): Promise<LogResponse>;
  getLog(user: UserAuth, id: number): Promise<LogResponse | null>;
  getTodayLogs(user: UserAuth): Promise<PeriodLog>;
}
