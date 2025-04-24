import 'reflect-metadata';
import dotenv from 'dotenv';
import AppDataSource from './data-source';
import express from 'express';
import routes_v1 from './endpoints/routes/index';
import cors from 'cors';
import { errorMiddleware } from './logic/middleware/error.middleware';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(errorMiddleware)

AppDataSource.initialize().then(() => {
  console.log('DB initialized');
  const PORT = process.env.PORT || 5000;

  // Register routes
  app.use('/api/', routes_v1);

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
