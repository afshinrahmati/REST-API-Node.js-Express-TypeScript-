import dotenv from 'dotenv';
import ExpressApplication from './index';
import express from 'express';
import logger from './lib/logger';
dotenv.config({ path: `${process.cwd()}/.env.${process.env.NODE_DEV}` });
const PORT = process.env.PORT || 8080;
const app = new ExpressApplication(
  PORT,
  [express.json({ limit: '10kb' }), express.urlencoded({ extended: true })],
  [],
);
const server = app.start();
process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECIEVED!');
  server.close(() => {
    logger.warn('Process terminated!');
  });
});
