const intersection = (
  o1left: number, o1top: number, o1right: number, o1bottom: number,
  o2left: number, o2top: number, o2right: number, o2bottom: number,
): boolean => !(
  (o1bottom < o2top)
  || (o1top > o2bottom)
  || (o1left < o2left)
  || (o1left > o2right));

export default intersection;
