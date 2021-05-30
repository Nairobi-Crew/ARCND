import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/index';
import Input from 'UI/Input/index';
import Button from 'UI/Button/index';
import { loginUser, logoutUser } from 'Reducers/auth/actions';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect, useOAuthReselect } from 'Store/hooks';
import isClient from 'Util/isClient';
import { serviceIdAction } from 'Reducers/oauth/actions';
import { OAUTH_REDIRECT_PATH } from 'Config/config';

const Login: React.FC<LoginProps> = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuthReselect();
  const oauth = useOAuthReselect();

  const OAuthPath = OAUTH_REDIRECT_PATH;
  const getRedirect = () => (isClient() ? `${window.location.origin}${OAuthPath}` : OAuthPath);

  const loginButtonHandle = () => {
    dispatch(loginUser(login, password));
  };

  const logoutButtonHandle = () => {
    dispatch(logoutUser());
  };

  const loginOAuthButtonHandle = () => {
    const redirect = getRedirect();
    if (redirect) {
      dispatch(serviceIdAction(redirect));
    }
  };

  const onLoginChangedHandler = (val: string): void => {
    setLogin(val);
  };
  const onPasswordChangedHandler = (val: string): void => {
    setPassword(val);
  };

  useEffect(() => {
    const service_id = oauth.serviceID;
    if (oauth.serviceID !== '') {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${getRedirect()}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauth]);

  useEffect(() => {
    if (auth.state === EAuthState.UNKNOWN) {
      //
    } else if (auth.state === EAuthState.LOGIN_ERROR) {
      setPasswordMessage(auth.reason);
    } else if (auth.state === EAuthState.LOGGED) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
        <Button onClick={loginOAuthButtonHandle} buttonType="round">login with Yandex</Button>
        {auth.state === EAuthState.LOGGED ? <Button className="logout_button" onClick={logoutButtonHandle} buttonType="round">logout</Button> : null}
        <Link className="login__link" to="/signup">Sign up</Link>
      </Form>
    </>
  );
};

export default Login;
