import 'reflect-metadata';
import dotenv from 'dotenv';
import AppDataSource from './data-source';
import express from 'express';
import routes_v1 from './endpoints/routes/index';
import cors from 'cors';
import { errorMiddleware } from './logic/middleware/error.middleware';
import logger from './logic/utils/logger';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV

const allowedOrigins = [
  process.env.FRONTEND_URL,
]

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^http:\/\/localhost(:\d+)?$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();


AppDataSource.initialize().then(() => {
  logger.info('DB initialized');
  const PORT = process.env.PORT || 5000;

  app.use(cors(corsOptions));
  app.use(express.json());  
  app.use('/api/', routes_v1);
  app.use(errorMiddleware)

  app.listen(PORT, () => {
    if (NODE_ENV != 'production')logger.info(`Listening on localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});;

export default app;
