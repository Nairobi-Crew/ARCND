import Routes from 'Server/routes/Routes';
import express, { Request, Response } from 'express';
import Fetch from 'Server/fetch/Fetch';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { EHttpStatusCodes } from 'Server/types';
import { logger } from 'Server/middlewares/logger';
import { tg_bot_token } from '../../../env.variables';

export default class Comment extends Routes {
  constructor(app: express.Application) {
    super(app, 'Comments');
  }

  configRoutes() {
    this.app.post('/comment', [logger({ needBody: true }), bodyChecker()], (req: Request, res: Response) => {
      // console.log('Token', tg_bot_token);
      Fetch.post(`https://api.telegram.org/bot${tg_bot_token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
        },
        data: {
          chat_id: '@Nairobi_arcnd_m4',
          text: req.body.comment,
        },
      })
        .then(() => {
          res.status(EHttpStatusCodes.OK).send({ reason: 'OK' });
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log('Error bot', e);
          res.status(EHttpStatusCodes.BAD_REQUEST).send({ reason: e.errorText });
        });
    });
    return this.app;
  }
}
