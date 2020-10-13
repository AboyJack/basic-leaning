import express, { Express, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import logger from 'morgan';
let app: Express = express();
import indexRouter from './routes/index';
import usersRouter from './routes/users';
app.use(logger('dev')); // 打印请求日志
app.use(express.json()); // 解析JSON格式的请求体
app.use(express.urlencoded()); // 解析表单格式的请求 req.body
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError(NOT_FOUND));
});
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status || INTERNAL_SERVER_ERROR);
  res.json({
    success: false,
    error
  });
});
export default app;