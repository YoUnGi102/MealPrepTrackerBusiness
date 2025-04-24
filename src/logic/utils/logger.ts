import winston from 'winston';

// Create a custom logger
const logger = winston.createLogger({
  level: 'info', // default log level
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    // Output logs to console
    new winston.transports.Console(),
    // Optionally output logs to a file
    new winston.transports.File({ filename: 'logs/app.log', level: 'info' }),
  ],
});

// Exports the logger instance
export default logger;
