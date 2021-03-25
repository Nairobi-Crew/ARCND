export default function arrayRemoveDuplicates<T>(a: T[]): T[] {
  return a.filter((item, index) => a.indexOf(item) === index);
}
