// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { LogRepository, PeriodLog } from '@src/repositories/interfaces/LogRepository';
import { TypeormLogRepository } from '@src/repositories/implementations/log.repository';
import { LogService } from '../interfaces/LogService';
import { User } from '@src/database/entities';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { LogResponse } from '../../types/response/LogResponse';
import { endOfDay, startOfDay } from 'date-fns';
import { calculateMacros } from '@src/database/utils/db.helper';
import { ERRORS } from '../../utils/errorMessages';
import logger from '../../utils/logger';
import { MealRepository } from '@src/repositories/interfaces/MealRepository';
import { TypeormMealRepository } from '@src/repositories/implementations/meal.repository';

export const createLogService = (dataSource: DataSource): LogService  => {
  const logRepository: LogRepository = new TypeormLogRepository(dataSource);
  const mealRepository: MealRepository = new TypeormMealRepository(dataSource);

  return {
    addLog: async (user: User, mealId: number): Promise<LogResponse> => {
        logger.debug(JSON.stringify({user, mealId}, null, 2))
        // Check if meal exists
        const meal = await mealRepository.getMealById(user, mealId);
        if(!meal){
            throw ERRORS.MEAL.NOT_FOUND(`Could not find meal ${mealId} to add to Log`);
        }
        else if (meal.portions <= 0){
            throw ERRORS.MEAL.NO_PORTIONS();
        }

        // Create Log
        const log = await logRepository.addLog(user, meal.id);

        logger.debug(JSON.stringify(log))
        return plainToInstance(LogResponse, log, {
            excludeExtraneousValues: true,
        });
    },
    getLog: async (user: User, id: number): Promise<LogResponse | null> => {
        logger.debug(JSON.stringify({id, user}));
        const log = await logRepository.getLog(user, id);
        logger.debug(JSON.stringify(log, null, 2));
        return plainToInstance(LogResponse, log, {
            excludeExtraneousValues: true
        })
    },
    getTodayLogs: async (user: User): Promise<PeriodLog> => {
        const periodFrom = startOfDay(new Date());
        const periodUntil = endOfDay(new Date());
        const logs = await logRepository.getTodayLogs(periodFrom, periodUntil, user);
        const macros = calculateMacros(1, logs.map((l) => l.meal));
        return {
            macros,
            logs: instanceToInstance(
                logs.map((log) => new LogResponse(log)),
            ),
            periodFrom,
            periodUntil
        }
    }
}
};
