import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  } else {
    res.status(500).send({ error: err, url: req.url });
  }
};

export default errorHandler;
