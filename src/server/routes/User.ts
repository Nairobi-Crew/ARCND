/* eslint-disable no-console */
import Routes from 'Server/routes/Routes';
import express, { Request, Response } from 'express';
import { isLogged } from 'Server/middlewares/isLogged';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import { logger } from 'Server/middlewares/logger';
import Cookies from 'Server/fetch/Cookies';
import Fetch from 'Server/fetch/Fetch';
import { EHttpStatusCodes } from 'Server/types';
import { USER_SERVER_URL, USER_URL } from 'Config/config';
// @ts-ignore
import FormData from 'form-data';
import Multer from 'multer';
import { getUser } from 'Server/db/users';
import Auth from 'Server/routes/Auth';
import path from 'path';
import fs from 'fs';
import { createDirectories } from 'Server/utils';

export default class User extends Routes {
  constructor(app: express.Application) {
    super(app, 'User');
  }

  configRoutes() {
    const profile = '/profile';
    this.app.put(`${USER_URL}${profile}`, [isLogged(), bodyChecker(), logger({ needBody: true })], async (req: Request, res: Response) => {
      try {
        const user = await getUser(req);
        const {
          first_name, second_name, phone, avatar, theme, email, display_name, login,
        } = req.body;
        if (user) {
          await user.update({
            first_name, second_name, phone, avatar, theme, email, display_name, login,
          });
        }
      } catch (e) {
        console.log('Error update user', req.body);
      }
      await this.redirect(`${USER_SERVER_URL}${profile}`, 'PUT', req, res);
    });

    const avatar = '/profile/avatar';
    const m = Multer();
    this.app.put(`${USER_URL}${avatar}`, [m.single('avatar'), isLogged(), bodyChecker(), logger({ needBody: true })], async (req: Request, res: Response) => {
      const { file } = req;
      const form: any = new FormData();
      let av;
      form.append('avatar', file?.buffer, {
        filename: file?.originalname,
      });
      Fetch.put(`${USER_SERVER_URL}${avatar}`, {
        method: 'PUT',
        headers: {
          Cookie: Cookies.getCookies(req),
        },
        data: form,
      }).then(async (answer) => {
        const result = await answer.json();
        av = result.avatar;
        res.status(EHttpStatusCodes.OK).send(result);
      }).catch(async (e) => {
        const answer = await e.json();
        console.log('Avatar error', { e, answer });
        res.status(e.status).send(answer);
      });
      try {
        await Auth.getAvatar(req, av);
      } catch (e) {
        //
      }
    });

    this.app.get('/api/v2/avatar/*', [isLogged(), logger({ needParams: true })], async (req: Request, res: Response) => {
      const params = req.url.split('/');
      const avatarName = `/${params.slice(4).join('/')}`;
      const avatarData = await Auth.getAvatar(req, avatarName);
      if (avatarData) {
        try {
          const buffer = await (avatarData as Blob).arrayBuffer();
          const view = new Uint8Array(buffer);
          const fileName = path.join(__dirname, avatarName);
          createDirectories(avatarName);
          fs.writeFileSync(fileName, view);
          res.sendFile(fileName);
        } catch (e) {
          console.log('Error', e);
          res.send('');
        }
      } else {
        res.status(EHttpStatusCodes.OK).send('');
      }
    });

    const password = '/password';

    this.app.put(`${USER_URL}${password}`, [isLogged(), bodyChecker(), logger({ needBody: true })], async (req: Request, res: Response) => {
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
