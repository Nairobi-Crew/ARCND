import express, { Request, Response } from 'express';
import Routes from 'Server/routes/Routes';
import {
  API_PATH, OAUTH_PATH, SERVER_API_URL,
} from 'Config/config';
import Fetch from 'Server/fetch/Fetch';
import { EHttpStatusCodes } from 'Server/types';
import { logger } from 'Server/middlewares/logger';
import Cookies from 'Server/fetch/Cookies';

export default class OAuth extends Routes {
  constructor(app: express.Application) {
    super(app, 'OAuth');
  }

  configRoutes() {
    const OAUTH = `${API_PATH}${OAUTH_PATH}`;
    this.app.get(`${OAUTH}/service-id`, [logger({ needQuery: true })], (req: Request, res: Response) => {
      const OAUTH_SERVER = `${SERVER_API_URL}${OAUTH_PATH}/service-id?redirect_uri=${req.query.redirect_uri}`;
      Fetch.get(OAUTH_SERVER, {}).then(async (answer) => {
        try {
          const result = await answer.json();
          res.status(EHttpStatusCodes.OK).send(result);
          // eslint-disable-next-line no-console
          console.log('OAUTH service-id', { result, answer });
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('Error OAUTH get service ID JSON', e);
          res.status(EHttpStatusCodes.BAD_REQUEST).send(e.statusText);
        }
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Error OAUTH get service ID', error);
        res.status(EHttpStatusCodes.BAD_REQUEST).send(error.statusText);
      });
    });

    this.app.post(`${OAUTH}`, [logger({ needBody: true })], async (req: Request, res: Response) => {
      const Cookie = Cookies.getCookies(req);
      Fetch.post(
        `${SERVER_API_URL}${OAUTH_PATH}`,
        {
          data: req.body,
          headers: {
            Cookie,
          },
        },
      ).then(async (answer) => {
        Cookies.setCookies(answer, res);
        res.status(EHttpStatusCodes.OK).send(await answer.text());
      }).catch(async (error) => {
        // eslint-disable-next-line no-console
        console.log('Error OAUTH post', { error, reason: await error.text() });
        res.status(EHttpStatusCodes.FORBIDDEN).send(error.statusText);
      });
    });

    return this.app;
  }
}
