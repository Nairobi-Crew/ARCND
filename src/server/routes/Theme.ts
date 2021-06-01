import express, { Request, Response } from 'express';
import Routes from 'Server/routes/Routes';
import { isLogged } from 'Server/middlewares/isLogged';
import { logger } from 'Server/middlewares/logger';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { getUser } from 'Server/db/users';
import { EHttpStatusCodes } from 'Server/types';

export default class Theme extends Routes {
  constructor(app: express.Application) {
    super(app, 'Themes');
  }

  configRoutes() {
    this.app.post('/theme', [logger({ needBody: true }), isLogged(), bodyChecker()], async (req: Request, res: Response) => {
      const themeParam = req.body.theme;
      let theme = 'dark';
      if (themeParam === 'white') {
        theme = themeParam;
      }
      try {
        const user = await getUser(req);
        if (user) {
          await user.update({ theme });
        }
        res.status(EHttpStatusCodes.OK).send('OK');
      } catch (e) {
        res.status(EHttpStatusCodes.BAD_REQUEST).send({ reason: 'Error updating user theme' });
      }
    });
    return this.app;
  }
}
