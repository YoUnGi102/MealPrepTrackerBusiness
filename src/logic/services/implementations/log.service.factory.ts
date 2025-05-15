// src/services/ingredient.service.factory.ts
import { DataSource } from 'typeorm';
import { ILogRepository } from '@src/repositories/interfaces/ILogRepository';
import { TypeormLogRepository } from '@src/repositories/typeorm/log.repository';
import { ILogService } from '../interfaces/LogService';
import { instanceToInstance, plainToInstance } from 'class-transformer';
import { LogResponse } from '../../types/response/LogResponse';
import { endOfDay, startOfDay } from 'date-fns';
import { ERRORS } from '../../utils/errorMessages';
import logger from '../../utils/logger';
import { IMealRepository } from '@src/repositories/interfaces/IMealRepository';
import { TypeormMealRepository } from '@src/repositories/typeorm/meal.repository';
import { PeriodLog } from '@src/logic/types/other/PeriodLog';
import { calculateMacros } from '@src/logic/utils/calculateMacros';
import { UserAuth } from '@src/logic/types/request/UserAuth';
import { IUserRepository } from '@src/repositories/interfaces/IUserRepository';
import { TypeormUserRepository } from '@src/repositories/typeorm/user.repository';

export const createLogService = (dataSource: DataSource): ILogService => {
  const logRepository: ILogRepository = new TypeormLogRepository(dataSource);
  const mealRepository: IMealRepository = new TypeormMealRepository(dataSource);
  const userRepo: IUserRepository = new TypeormUserRepository(dataSource);

  return {
    addLog: async (user: UserAuth, mealId: number): Promise<LogResponse> => {
      const u = await userRepo.getUserByUsername(user.username);
      if (!u) {
        throw ERRORS.USER.NOT_FOUND();
      }

      // Check if meal exists
      const meal = await mealRepository.getMealById(u.id, mealId);
      if (!meal) {
        throw ERRORS.MEAL.NOT_FOUND(
          `Could not find meal ${mealId} to add to Log`,
        );
      } else if (meal.portions <= 0) {
        throw ERRORS.MEAL.NO_PORTIONS();
      }

      // Create Log
      const log = await logRepository.addLog(u.id, meal.id);

      return plainToInstance(LogResponse, log, {
        excludeExtraneousValues: true,
      });
    },
    getLog: async (user: UserAuth, id: number): Promise<LogResponse | null> => {
      const u = await userRepo.getUserByUsername(user.username);
      if (!u) {
        throw ERRORS.USER.NOT_FOUND();
      }
      logger.debug(JSON.stringify({ id, user }));
      const log = await logRepository.getLog(u.id, id);
      logger.debug(JSON.stringify(log, null, 2));
      return plainToInstance(LogResponse, log, {
        excludeExtraneousValues: true,
      });
    },
    getTodayLogs: async (user: UserAuth): Promise<PeriodLog> => {
      const u = await userRepo.getUserByUsername(user.username);
      if (!u) {
        throw ERRORS.USER.NOT_FOUND();
      }

      const periodFrom = startOfDay(new Date());
      const periodUntil = endOfDay(new Date());
      const logs = await logRepository.getTodayLogs(
        periodFrom,
        periodUntil,
        u.id,
      );
      const macros = calculateMacros(logs.map((l) => l.meal));
      return {
        macros,
        logs: instanceToInstance(logs.map((log) => new LogResponse(log))),
        periodFrom,
        periodUntil,
      };
    },
  };
};
