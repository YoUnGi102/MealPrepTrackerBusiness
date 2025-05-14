import { User } from "@src/database/entities";
import { LogResponse } from "@src/logic/types/response/LogResponse";
import { PeriodLog } from "@src/logic/types/other/PeriodLog";

export interface ILogService {
    addLog(user: User, mealId: number) : Promise<LogResponse>,
    getLog(user: User, id: number) : Promise<LogResponse | null>,
    getTodayLogs(user: User): Promise<PeriodLog>
}