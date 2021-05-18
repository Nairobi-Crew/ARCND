import express, { Request, Response } from 'express';
import Routes from 'Server/routes/Routes';
import { LEADER_SERVER_URL, LEADER_URL } from 'Config/config';
import { logger } from 'Server/middlewares/logger';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { isLogged } from 'Server/middlewares/isLogged';

export default class Leader extends Routes {
  constructor(app: express.Application) {
    super(app, 'Leader');
  }

  configRoutes() {
    const all = '/all';
    this.app.post(`${LEADER_URL}${all}`, [logger({ needBody: true }), isLogged(), bodyChecker()], async (req: Request, res: Response) => {
      await this.redirect(`${LEADER_SERVER_URL}${all}`, 'POST', req, res);
    });
    this.app.post(`${LEADER_URL}`, [logger({ needBody: true }), isLogged(), bodyChecker()], async (req: Request, res: Response) => {
      await this.redirect(`${LEADER_SERVER_URL}`, 'POST', req, res);
    });
    return this.app;
  }
}
