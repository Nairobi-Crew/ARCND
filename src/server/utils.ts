import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const getFileByExt = (list: string[], ext: string) => {
  const found = list.find((file) => path.extname(file) === ext);
  return found ?? '';
};
