import 'reflect-metadata';
import dotenv from 'dotenv';
import AppDataSource from './data-source';
import express from 'express';
import routes_v1 from './routes/index';
dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log('DB initialized');
  const PORT = process.env.PORT || 5000;

  // Register routes
  app.use('/api/', routes_v1);

  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
});
