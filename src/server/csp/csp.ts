import crypto from 'crypto';
import { v4 } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const generateCsp = (): [csp: string, nonce: string] => {
  const hash = crypto.createHash('sha256');
  hash.update(v4());
  const nonce = hash.digest('base64');

  const csp = `default-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://ya-praktikum.tech/;
  img-src data: 'self' 'unsafe-eval' https://ya-praktikum.tech/;
  style-src data: 'self' 'unsafe-inline';
  script-src data: 'self' 'unsafe-inline'`;

  return [csp, nonce];
};
