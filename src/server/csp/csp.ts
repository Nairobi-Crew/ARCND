import crypto from 'crypto';
import { v4 } from 'uuid';

// eslint-disable-next-line import/prefer-default-export
export const generateCsp = (): [csp: string, nonce: string] => {
  const hash = crypto.createHash('sha256');
  hash.update(v4());
  const nonce = hash.digest('base64');

  const csp = `default-src 'self' 'nonce-${nonce};`;

  return [csp, nonce];
};
