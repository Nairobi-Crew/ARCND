import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const bodyChecker = (errorCode: number = 403) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    res.status(errorCode).send({ reason: 'Error in parameters' });
  } else {
    next();
  }
};
