import path from 'path';
import * as fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export const getFileByExt = (list: string[], ext: string) => {
  const found = list.find((file) => path.extname(file) === ext);
  return found ?? '';
};

export const createDirectories = (pathname: string) => {
  // const __dirname = path.resolve();
  pathname = pathname.replace(/^\.*\/|\/?[^/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
  fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
    if (e) {
      // eslint-disable-next-line no-console
      console.error('Error create folders', e);
    }
  });
};
