import React, { useEffect, useState } from 'react';
import { RegisterProps } from 'Pages/Register/types';
import Form from 'UI/Form/index';
import Input from 'UI/Input/index';
import Button from 'UI/Button/index';
import './Register.scss';
import { useAuthReselect } from 'Store/hooks';
import { useDispatch } from 'react-redux';
import { logoutUser, registerUser } from 'Reducers/auth/actions';
import emailIsValid from 'Util/emailValidator';
import phoneIsValid from 'Util/phoneValidator';
import { EAuthState } from 'Reducers/auth/types';
import { useHistory } from 'react-router-dom';

const Register: RegisterProps = ({ caption }) => {
  const [secondName, setSecondName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [loginError, setLoginError] = useState('');
  const historyHook = useHistory();

  const auth = useAuthReselect();
  const dispatch = useDispatch();

  const LogoutButtonHandler = () => {
    dispatch(logoutUser());
  };

  const checkPasswords = (): boolean => {
    let error = '';
    if (password1.length < 8) {
      error = 'Минимальная длина пароля 8 символов';
    } else if (password1 !== password2) {
      error = 'Пароли не совпадают';
    }
    setPassword1Error(error);
    return error === '';
  };

  const checkEmail = (): boolean => {
    const valid = emailIsValid(email);
    setEmailError(valid ? '' : 'Неверный EMail');
    return valid;
  };

  const checkPhone = () => {
    const valid = phoneIsValid(phone);
    setPhoneError(valid ? '' : 'Неверный номер телефона');
    return valid;
  };

  const checkLogin = () => {
    const valid = /^[a-zA-Z0-9_]+$/.test(login);
    setLoginError(valid ? '' : 'Неверный логин');
    return valid;
  };

  const registerButtonHandler = () => {
    if (checkPasswords() && checkEmail() && checkPhone() && checkLogin()) {
      dispatch(registerUser({
        first_name: firstName, second_name: secondName, email, login, phone, password: password1,
      }));
    }
  };

  useEffect(() => {
    if (auth.state === EAuthState.LOGGED) {
      historyHook.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Form caption={caption || 'SING UP'}>
      <Input
        label="Фамилия"
        onValueChanged={(val) => setSecondName(val)}
        value={secondName}
      />
      <Input
        label="Имя"
        onValueChanged={(val) => setFirstName(val)}
        value={firstName}
      />
      <Input
        label="Логин"
        onValueChanged={(val) => setLogin(val)}
        value={login}
        errorMessage={loginError}
      />
      <Input
        label="E-Mail"
        onValueChanged={(val) => setEmail(val)}
        value={email}
        errorMessage={emailError}
      />
      <Input
        label="Phone"
        onValueChanged={(val) => setPhone(val)}
        value={phone}
        errorMessage={phoneError}
      />
      <Input
        type="password"
        label="Пароль"
        onValueChanged={(val) => setPassword1(val)}
        value={password1}
        errorMessage={password1Error}
      />
      <Input
        type="password"
        label="Повтор"
        onValueChanged={(val) => setPassword2(val)}
        value={password2}
      />
      <Button
        className="registration__submit button button_type_rounded"
        onClick={registerButtonHandler}
      >
        Зарегистрироваться
      </Button>
      {
        auth.state === EAuthState.LOGGED
          ? (
            <Button
              className="button button_type_rounded"
              onClick={LogoutButtonHandler}
            >
              Logout
            </Button>
          )
          : null
      }
    </Form>
  );
};

export default Register;
