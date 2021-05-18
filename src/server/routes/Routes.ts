import express, { Request, Response } from 'express';
import Cookies from 'Server/fetch/Cookies';
import Fetch, { HTTPMethod } from 'Server/fetch/Fetch';
import { EHttpStatusCodes } from 'Server/types';

export default abstract class Routes {
  app: express.Application;

  name: string

  protected constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configRoutes();
  }

  getName(): string {
    return this.name;
  }

  redirect = async (path: string, method: HTTPMethod, req: Request, res: Response) => {
    const Cookie = Cookies.getCookies(req);
    try {
      const answer = await Fetch.fetch(path, { method, headers: { Cookie }, data: req.body });
      const result = await answer.json();
      res.status(EHttpStatusCodes.OK).send(result);
    } catch (e) {
      res.status(e.statusCode).send(e);
    }
  };

  abstract configRoutes(): express.Application;
}
