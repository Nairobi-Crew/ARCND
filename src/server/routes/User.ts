import Routes from 'Server/routes/Routes';
import express, { Request, Response } from 'express';
import { isLogged } from 'Server/middlewares/isLogged';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { logger } from 'Server/middlewares/logger';
import Cookies from 'Server/fetch/Cookies';
import Fetch from 'Server/fetch/Fetch';
import { EHttpStatusCodes } from 'Server/types';
import { USER_SERVER_URL, USER_URL } from 'Config/config';

export default class User extends Routes {
  constructor(app: express.Application) {
    super(app, 'User');
  }

  configRoutes() {
    const profile = '/profile';
    this.app.put(`${USER_URL}${profile}`, [isLogged(), bodyChecker(), logger({ needBody: true })], async (req: Request, res: Response) => {
      await this.redirect(`${USER_SERVER_URL}${profile}`, 'PUT', req, res);
    });
    const password = '/password';

    this.app.put(`${USER_URL}${password}`, [logger({ needBody: true }), isLogged(), bodyChecker()], async (req: Request, res: Response) => {
      await this.redirect(`${USER_SERVER_URL}${password}`, 'PUT', req, res);
    });

    this.app.get(`${USER_URL}/:id`, [logger({ needParams: true }), isLogged()], async (req: Request, res: Response) => {
      const id = req.params?.id;
      if (!id) {
        res.status(EHttpStatusCodes.BAD_REQUEST).send({ reason: 'Bad parameters' });
      }
      const Cookie = Cookies.getCookies(req);
      try {
        const answer = await Fetch.get(`${USER_SERVER_URL}/${id}`, { headers: { Cookie } });
        const result = await answer.json();
        res.status(EHttpStatusCodes.OK).send(result);
      } catch (e) {
        res.status(e.statusCode).send(e);
      }
    });
    return this.app;
  }
}
