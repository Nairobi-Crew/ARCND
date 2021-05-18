import { Request, Response, NextFunction } from 'express';
import Cookies from 'Server/fetch/Cookies';
import Fetch from 'Server/fetch/Fetch';
import { AUTH_SERVER_URL } from 'Config/config';

// eslint-disable-next-line import/prefer-default-export
export const isLogged = (errorCode: number = 401) => async (req: Request, res: Response, next: NextFunction) => {
  const Cookie = Cookies.getCookies(req);
  const url = `${AUTH_SERVER_URL}/user`;
  try {
    await Fetch.get(url, { headers: { Cookie } });
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`isLogged: Not authorized ${req.url}`, e);
    res.status(errorCode).send(e.statusText || 'Unauthorized');
  }
};
