const loginIsValid = (login: string): boolean => /^[a-zA-Z0-9_]+$/.test(login);

export default loginIsValid;
