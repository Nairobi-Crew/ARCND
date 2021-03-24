const padString = (s: string, len: number, char: string): string => {
  let res = s;
  if (len < res.length) {
    res = res.slice(1, len);
  } else if (len > res.length) {
    res = `${res}${Array(len - res.length).join(char)}`;
  }
  return res;
};

export default padString;
