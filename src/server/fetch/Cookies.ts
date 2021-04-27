import setCookie from 'set-cookie-parser';
import { Request, Response } from 'express';
import { Response as FetchResponse } from 'node-fetch';

type TCookie = {
  [index: string]: string
}

class Cookies {
  static setCookies(fetchAnswer: FetchResponse, res: Response): void {
    const { headers } = fetchAnswer;
    const cookies = setCookie.parse(headers.raw()['set-cookie'], { decodeValues: true });
    if (cookies) {
      cookies.forEach(({ name, value }) => res.cookie(name, value));
    }
  }

  static getCookies(req: Request): TCookie[] {
    const r: TCookie[] = [];
    const cookie = req?.headers?.cookie;
    if (cookie) {
      const cookieList = cookie.split(',');
      cookieList.forEach((c) => {
        const [name, value] = c.split('=');
        r[name] = value;
      });
    }
    return r;
  }
}

export default Cookies;
