import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(500).send({ error: err });
  }
};

export default errorHandler;
