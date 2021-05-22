// eslint-disable-next-line import/prefer-default-export
export const randomRange = (from: number, to: number): number => {
  const qty = to - from;
  if (qty <= 0) {
    throw new Error('Range error');
  }

  return Math.round(Math.random() * qty) + from;
};
