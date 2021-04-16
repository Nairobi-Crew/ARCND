const randomNumberChar = (set: string) => {
  const rnd = Math.round(Math.random() * set.length);
  return set[rnd];
};

const getRandomId = (len = 10) => {
  let res = '';
  for (let i = 0; i < len; i += 1) {
    res += randomNumberChar(Date.now().toString());
  }
  return res;
};

export default getRandomId;
