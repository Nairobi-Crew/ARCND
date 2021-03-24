export default function getNextChar(s: string) {
  let charPos = 0;
  return (): string => {
    const char = s.substr(charPos, 1);
    charPos += 1;
    return char;
  };
}
