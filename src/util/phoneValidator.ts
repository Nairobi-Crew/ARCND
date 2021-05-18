const phoneIsValid = (phone: string): boolean => {
  // eslint-disable-next-line max-len
  // const regExp = /^(\+*)(\d*)([(]\d{1,3}[)]*)*(\s?\d+|\+\d{2,3}\s\d+|\d+)[\s|-]?\d+([\s|-]?\d+){1,2}(\s)*$/gm
  const phoneValidateRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;
  return phoneValidateRegExp.test(phone);
};

export default phoneIsValid;
