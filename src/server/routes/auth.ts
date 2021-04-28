import Fetch, { TFetchOptions } from 'Server/fetch/Fetch';
import Cookies from 'Server/fetch/Cookies';
import { Request } from 'express';
import { IUser } from 'Store/types';

export const getUserInfo = (url, req: Request): Promise<IUser> => new Promise((resolve, reject) => {
  const Cookie = Cookies.getCookies(req);
  const getUserOptions: TFetchOptions<string> = {
    headers: { Cookie },
  };
  Fetch.get(url, getUserOptions)
    .then(async (answer) => resolve(await answer.json() as IUser))
    .catch((error) => reject(error));
});

const authRoutes = (app, json, url, serverUrl) => {
  app.post(`${url}/signin`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const { login, password } = req.body;
    const loginOptions: TFetchOptions<{ login, password }> = {
      data: { login, password },
    };
    const serverAddress = `${serverUrl}/signin`;
    Fetch.post(serverAddress, loginOptions)
      .then(async (answer) => {
        Cookies.setCookies(answer, res);
        res.status(200).send(await answer.text());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });

  app.get(`${url}/user`, json, (req, res) => {
    const su = `${serverUrl}/user`;
    getUserInfo(su, req)
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  });

  app.post(`${url}/logout`, (req, res) => {
    const Cookie = Cookies.getCookies(req);

    const LogoutUserOptions: TFetchOptions<string> = {
      headers: { Cookie },
    };
    Fetch.post(`${serverUrl}/logout`, LogoutUserOptions)
      .then(async (answer) => {
        res.clearCookie('authCookie');
        res.clearCookie('uuid');
        res.status(200).send(await answer.text());
      })
      .catch((error) => res.status(error.status).send(error.statusText));
  });
};

export default authRoutes;