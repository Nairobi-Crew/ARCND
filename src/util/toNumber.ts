// eslint-disable-next-line import/prefer-default-export
export const toNumber = (value: number | string | undefined): number => {
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      try {
        return parseInt(value, 10);
      } catch (e) {
        return 0;
      }
    default:
      return 0;
  }
};
