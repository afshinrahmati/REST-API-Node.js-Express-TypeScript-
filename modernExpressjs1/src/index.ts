import express, { type Application, Handler } from 'express';
import * as path from 'path';
import * as process from 'process';
import morgan from 'morgan';
import logger from './lib/logger';
import 'reflect-metadata';
class ExpressApplication {
  private readonly app: Application;
  constructor(
    private port: string | number,
    private middlewares: any[],
    private controller: any[],
  ) {
    this.app = express();
    this.port = port;
    this.setupMiddlewares(this.middlewares);
    this.configureAssets();
    this.setupLogger();
  }

  private setupMiddlewares(middlewaresArray: any) {
    middlewaresArray.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private configureAssets() {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }
  private setupLogger() {
    if (process.env.NODE_DEV === 'development') {
      this.app.use(morgan('dev'));
    }
  }
  public start() {
    return this.app.listen(this.port, () => {
      logger.info(`Welcome app run on port: ${this.port}`);
    });
  }

  private setupRoutes(controllers: any[]) {
    const info: Array<{ api: string; handler: string }> = [];
    controllers.forEach((Controller) => {
      const controllerInstance: { [handleName: string]: Handler } =
        new Controller();

      const basePath: string;
    });
  }
}

export default ExpressApplication;
