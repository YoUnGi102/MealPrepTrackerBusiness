import express, { Request, Response } from 'express';

const app = express();

// Simple route to test if the app works
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, MealPrepTracker!');
});

// Another route to test more functionality
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});

export default app;
