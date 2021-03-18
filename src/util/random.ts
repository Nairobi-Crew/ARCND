export default function random(num: number): number {
  const n = Math.round(Math.random() * num);
  console.log('Random', n);
  return n;
}
