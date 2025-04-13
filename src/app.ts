import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRoute from './routes/health'; // Your existing health route
import ingredientsRoute from './routes/ingredient'; // New ingredients route

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Health check route
app.use('/api/health', healthRoute);

// Ingredients route
app.use('/api/ingredients', ingredientsRoute);

// Error handling middleware (optional but recommended)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
  },
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
