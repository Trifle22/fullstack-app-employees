
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

import usersRouter from './routes/users';
import employeesRouter from './routes/employees';

dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
  }

  private config() {

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private routerSetup() {
    this.app.use('/api/user', usersRouter);
    this.app.use('/api/employees', employeesRouter);
  }

}

export default new App().app;

