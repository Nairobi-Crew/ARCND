import Routes from 'Server/routes/Routes';
import express, { Request, Response } from 'express';
import { bodyChecker } from 'Server/middlewares/bodyChecker';
import Fetch from 'Server/fetch/Fetch';
import { EHttpStatusCodes } from 'Server/types';
import { logger } from 'Server/middlewares/logger';
import { UserModel } from 'Server/db/models/user';
import { isLogged } from 'Server/middlewares/isLogged';
import Cookies from 'Server/fetch/Cookies';
import { IUser } from 'Store/types';
import { AUTH_SERVER_URL, AUTH_URL } from 'Config/config';
import { checkDBUser } from 'Server/db/users';

export default class Auth extends Routes {
  constructor(app: express.Application) {
    super(app, 'Auth');
  }

  configRoutes() {
    const signin = '/signin';

    this.app.post(`${AUTH_URL}${signin}`, [logger({ needBody: true }), bodyChecker()], async (req: Request, res: Response) => {
      const { login, password } = req.body;
      try {
        const answer = await Fetch.post(`${AUTH_SERVER_URL}${signin}`, { data: { login, password } });
        Cookies.setCookies(answer, res);
        const answerText = await answer.text();
        res.status(EHttpStatusCodes.OK).send(answerText);
      } catch (e) {
        res.status(EHttpStatusCodes.FORBIDDEN).send(await e.json());
      }
    });

    const signup = '/signup';

    this.app.post(`${AUTH_URL}${signup}`, [bodyChecker(), logger({})], async (req: Request, res: Response) => {
      const data = req.body;
      try {
        const answer = await Fetch.post(`${AUTH_SERVER_URL}${signup}`, { data });
        Cookies.setCookies(answer, res);
        const { id } = await answer.json();
        res.status(EHttpStatusCodes.OK).send({ id });
        await UserModel.create({
          id,
          first_name: data.first_name,
          second_name: data.second_name,
          login: data.login,
          email: data.email,
          phone: data.email,
        });
      } catch (e) {
        res.status(EHttpStatusCodes.FORBIDDEN).send(e);
      }
    });

    const logout = '/logout';

    this.app.post(`${AUTH_URL}${logout}`, [isLogged(), logger({})], async (req: Request, res: Response) => {
      const Cookie = Cookies.getCookies(req);

      try {
        const answer = await Fetch.post(`${AUTH_SERVER_URL}${logout}`, { headers: { Cookie } });
        const answerText = await answer.text();
        res.clearCookie('authCookie');
        res.clearCookie('uuid');
        res.status(EHttpStatusCodes.OK).send(answerText);
      } catch (e) {
        res.status(EHttpStatusCodes.FORBIDDEN).send(e);
      }
    });

    const user = '/user';
    this.app.get(`${AUTH_URL}${user}`, [logger({})], async (req: Request, res: Response) => {
      try {
        // eslint-disable-next-line no-shadow
        const user = await Auth.getUser(req);
        // const Cookie = Cookies.getCookies(req);
        // const answer = await Fetch.get(`${AUTH_SERVER_URL}${user}`, { headers: { Cookie } });
        // const result = await answer.json();
        if (user) {
          res.status(EHttpStatusCodes.OK).send(user);
        } else {
          res.status(EHttpStatusCodes.UNAUTHORIZED).send({ reason: 'Error get user info' });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error get user info', { error: e.statusText, cookie: Cookies.getCookies(req) });
        res.status(EHttpStatusCodes.UNAUTHORIZED).send(e.statusText);
      }
    });
    return this.app;
  }

  static async getUser(req: Request): Promise<IUser | null> {
    const Cookie = Cookies.getCookies(req);
    let user: IUser;
    try {
      const answer = await Fetch.get(`${AUTH_SERVER_URL}/user`, { headers: { Cookie } });
      user = await answer.json() as IUser;
      const found = await checkDBUser(user);
      if (found) {
        const cloned = JSON.parse(JSON.stringify(found));
        user.theme = cloned.theme;
      }
      return user;
    } catch (e) {
      return null;
    }
  }
}
