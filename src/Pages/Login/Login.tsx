import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { globalBus } from 'Util/EventBus';
import { AUTH_SERVICE_EVENTS } from '../../services/types';
import './Login.scss';

const Login: React.FC<LoginProps> = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const history = useHistory();

  const loginButtonHandle = () => {
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_SIGNIN, login, password);
  };

  const logoutButtonHandle = () => {
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_LOGOUT);
  };

  const onLoginChangedHandler = (val: string): void => {
    setLogin(val);
  };
  const onPasswordChangedHandler = (val: string): void => {
    setPassword(val);
  };

  useEffect(() => {
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNIN_DONE, () => {
      history.push('/profile');
    });
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNIN_ERROR, ({ data }) => {
      setPasswordMessage(data.reason);
    });
  }, []);

  return (
    <>
      <Form caption={caption || 'SING IN'}>
        <Input
          className="input__input"
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
          className="input__input"
          onValueChanged={onPasswordChangedHandler}
          errorMessage={passwordMessage}
        />
        <Button onClick={loginButtonHandle} buttonType="round">login</Button>
        <Button className="logout_button" onClick={logoutButtonHandle} buttonType="round">logout</Button>
        <a className="login__link" href="/signup">Sign up</a>
      </Form>
    </>
  );
};

export default Login;
