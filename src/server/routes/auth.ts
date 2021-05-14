import Fetch, { TFetchOptions } from 'Server/fetch/Fetch';
import Cookies from 'Server/fetch/Cookies';
import { Request, Express } from 'express';
import { IUser } from 'Store/types';

export const getUserInfo = (
  url: string,
  req: Request,
): Promise<IUser> => new Promise((resolve, reject) => {
  const Cookie = Cookies.getCookies(req);
  const getUserOptions: TFetchOptions = {
    headers: { Cookie },
  };
  Fetch.get(url, getUserOptions)
    .then(async (answer) => {
      try {
        const answer_json = await answer.json();
        resolve(answer_json as IUser);
      } catch (e) {
        reject(e);
      }
    })
    .catch((error) => {
      reject(error);
    });
});

const authRoutes = (app: Express, json: any, url: string, serverUrl: string) => {
  app.post(`${url}/signin`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const { login, password } = req.body;
    const loginOptions: TFetchOptions = {
      data: { login, password },
    };
    const serverAddress = `${serverUrl}/signin`;
    Fetch.post(serverAddress, loginOptions)
      .then(async (answer) => {
        Cookies.setCookies(answer, res);
        res.status(200).send(await answer.text());
      })
      .catch((error) => {
        res.status(error.status || 500).send(error.statusText);
      });
  });

  app.post(`${url}/signup`, json, (req, res) => {
    if (!req.body) {
      res.status(400).send({ reason: 'Error in parameters' });
      return;
    }
    const {
      first_name, second_name, login, email, password, phone,
    } = req.body;

    const serverAddress = `${serverUrl}/signup`;
    Fetch.post(serverAddress, {
      data: {
        first_name,
        second_name,
        login,
        email,
        password,
        phone,
      },
    }).then((answer) => {
      Cookies.setCookies(answer, res);
      answer.json().then((result) => {
        res.status(200).send(result);
      }).catch((error) => {
        res.status(400).send(error);
      });
    }).catch(async (error) => res.status(error.status).send(await error.text()));
  });

  app.get(`${url}/user`, json, (req, res) => {
    const su = `${serverUrl}/user`;
    getUserInfo(su, req)
      .then((user) => res.status(200).send(user))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('Error get user info', error);
        res.status(error.status || 500).send(error.statusText);
      });
  });

  app.post(`${url}/logout`, (req, res) => {
    const Cookie = Cookies.getCookies(req);
    const LogoutUserOptions: TFetchOptions = {
      headers: { Cookie },
    };
    Fetch.post(`${serverUrl}/logout`, LogoutUserOptions)
      .then(async (answer) => {
        res.clearCookie('authCookie');
        res.clearCookie('uuid');
        res.status(200).send(await answer.text());
      })
      .catch(() => {
        res.status(200).send('Ok');
        // res.status(error.status).send(error.statusText)
      });
  });
};

export default authRoutes;
