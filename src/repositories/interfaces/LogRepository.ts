import { Log, Meal, User } from "@src/database/entities";
import { Macros } from "@src/logic/types/core/Macros";
import { LogResponse } from "@src/logic/types/response/LogResponse";

export interface PeriodLog {
    logs: LogResponse[];
    macros: Macros;
    periodFrom: Date;
    periodUntil: Date;
}

export interface LogRepository {
    addLog(user: User, mealId: number): Promise<Log>;
    getLog(user: User, id: number): Promise<Log | null>;
    getTodayLogs(periodFrom: Date, periodUntil: Date, user: User): Promise<Log[]>;
}