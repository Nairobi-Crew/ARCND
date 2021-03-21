import React, {useEffect, useState} from 'react';
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { AUTH_SERVICE_EVENTS } from 'Config/types';
import { globalBus } from '../../util/EventBus';

const Login: LoginProps = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
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
      console.log('Login OK', params);
    });
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNIN_ERROR, (e) => {
      console.log('Login error', e);
    });
  }, []);
  return (
    <>
      <Form caption={caption}>
        <Input id="login_login" label="Имя пользователя" value={login} onValueChanged={onLoginChangedHandler} />
        <Input id="login_password" label="Пароль" value={password} type="password" onValueChanged={onPasswordChangedHandler} />
        <Button onClick={loginButtonHandle}>Логин</Button>
        <a href="/register">Нет аккаунта</a>
      </Form>
    </>
  );
};

export default Login;
