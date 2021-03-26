import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { AUTH_SERVICE_EVENTS } from '../../services/types';
import { globalBus } from '../../util/EventBus';
import './Login.scss';

const Login: LoginProps = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const loginButtonHandle = () => {
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_SIGNIN, login, password);
  };
  const onLoginChangedHandler = (val: string): void => {
    setLogin(val);
  };
  const onPasswordChangedHandler = (val: string): void => {
    setPassword(val);
  };

  useEffect(() => {
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNIN_DONE, (params) => {
      history.push('/game');
    });
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNIN_ERROR, (e) => {
      // console.log('Login error', e);
    });
  }, []);

  return (
    <>
      <Form className={'login'} caption={'SING IN'}>
        <Input
          className='login__input input__input'
          id="login_login"
          label="Имя пользователя"
          value={login}
          onValueChanged={onLoginChangedHandler}
        />
        <Input
          id="login_password"
          label="Пароль"
          value={password}
          type="password"
          className='login__input input__input'
          onValueChanged={onPasswordChangedHandler}
        />
        <Button
          onClick={loginButtonHandle}
          className={'login__submit button button_type_rounded'}
        >login</Button>
        <a className='login__link' href="/signup">Sign up</a>
      </Form>
    </>
  );
};

export default Login;
