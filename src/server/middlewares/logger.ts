/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';

type LoggerParams = {
  needParams?: boolean
  needBody?: boolean
  needQuery?: boolean
}

// eslint-disable-next-line import/prefer-default-export
export const logger = (param: LoggerParams) => (req: Request, _res: Response, next: NextFunction) => {
  const res: Record<string, any> = {};
  if (param.needQuery) {
    res.query = req.query;
  }
  if (param.needParams) {
    res.params = req.params;
  }
  if (param.needBody) {
    res.body = req.body;
  }
  console.log(`URL: ${req.url}, Method: ${req.method}`, res);
  next();
};
