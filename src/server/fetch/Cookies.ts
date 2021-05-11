import setCookie from 'set-cookie-parser';
import { Request, Response } from 'express';
import { Response as FetchResponse } from 'node-fetch';

class Cookies {
  static setCookies(fetchAnswer: FetchResponse, res: Response): void {
    const { headers } = fetchAnswer;
    const cookies = setCookie.parse(headers.raw()['set-cookie'], { decodeValues: true });
    if (cookies) {
      cookies.forEach(({ name, value }) => res.cookie(name, value));
    }
  }

  static getCookies(req: Request) {
    if (req.headers.cookie) {
      return req.headers.cookie;
    }
    return '';
  }
}

export default Cookies;
