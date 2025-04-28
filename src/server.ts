import 'reflect-metadata';
import dotenv from 'dotenv';
import AppDataSource from './data-source';
import express from 'express';
import routes_v1 from './endpoints/routes/index';
import cors from 'cors';
import { errorMiddleware } from './logic/middleware/error.middleware';
import logger from './logic/utils/logger';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(errorMiddleware)

AppDataSource.initialize().then(() => {
  logger.info('DB initialized');
  const PORT = process.env.PORT || 5000;

  // Register routes
  app.use('/api/', routes_v1);

  app.listen(PORT, () => {
    logger.info(`Listening on http://localhost:${PORT}`);
  });
});

export default app;
