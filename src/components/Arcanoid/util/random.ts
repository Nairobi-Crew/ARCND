export default function random(num: number): number {
  return Math.round(Math.random() * num);
}

export const randomRange = (from: number, to: number): number => {
  const qty = to - from;
  if (qty <= 0) {
    throw new Error('Range error');
  }

  return Math.round(Math.random() * qty) + from;
};
