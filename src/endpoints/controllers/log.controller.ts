import { NextFunction, Request, Response } from 'express';
import AppDataSource from 'src/data-source';
import logger from '../../logic/utils/logger';
import { createLogService } from '@src/logic/services/implementations/log.service.factory';
import { ERRORS } from '@src/logic/utils/errorMessages';

const logService = createLogService(AppDataSource);

const addLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`POST /api/log/ ${req.body}`);
  try {
    const {mealId} = req.body
    if(!req.user){
        throw ERRORS.USER.NOT_FOUND();
    }
    const log = await logService.addLog(req.user, Number(mealId));
    if(log){
      res.status(201).json({data: log});
    }else{
      throw new Error('Log not created');
    }
  } catch (err) {
    next(err);
  }
};

const getLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`GET /api/log/:id ${req}`);
  logger.debug(JSON.stringify(req.params));
  try {
    const {logId} = req.params;
    if(!req.user){
        throw ERRORS.USER.NOT_FOUND();
    }
    if(!logId) {
      throw ERRORS.LOG
    }
    const log = await logService.getLog(req.user, Number(logId));
    if(log){
      res.status(200).json({data: log});
    } else{
      throw ERRORS.LOG.NOT_FOUND();
    }
  } catch (err) {
    logger.debug(err);
    next(err);
  }
};

export default {addLog, getLog}