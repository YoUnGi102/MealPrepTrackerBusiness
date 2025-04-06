import app from './app'; // Import the app defined in app.ts
import dotenv from 'dotenv';

// Load environment variables from .env file (if available)
dotenv.config();

// Define the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
