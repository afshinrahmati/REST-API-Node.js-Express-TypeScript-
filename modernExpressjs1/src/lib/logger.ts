import { createLogger, format, transports } from 'winston';

const { printf, timestamp, combine, errors, colorize } = format;

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    printf(
      ({ level, message, timestamp, stack }) =>
        `${timestamp} ${level}: ${stack || message}`,
    ),
  ),
  transports: [new transports.Console()],
});

export default logger;
