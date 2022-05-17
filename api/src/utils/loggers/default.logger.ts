import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_LOGGING_DIR = process.env.DEFAULT_LOGGING_DIR || ''

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: DEFAULT_LOGGING_DIR + '/api.error.log', level: 'error' }),
    new transports.File({ filename: DEFAULT_LOGGING_DIR + '/api.combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}