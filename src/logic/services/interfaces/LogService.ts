import { Log, Meal, User } from "@src/database/entities";
import { LogResponse } from "@src/logic/types/response/LogResponse";
import { PeriodLog } from "@src/repositories/interfaces/LogRepository";

export interface LogService {
    addLog(user: User, mealId: number) : Promise<LogResponse>,
    getLog(user: User, id: number) : Promise<LogResponse | null>,
    getTodayLogs(user: User): Promise<PeriodLog>
}