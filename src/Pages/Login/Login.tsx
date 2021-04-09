import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { getUserData, loginUser, logoutUser } from 'Reducers/auth/actions';
import './Login.scss';
import { useDispatch } from 'react-redux';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';

const Login: React.FC<LoginProps> = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuthReselect();
  const loginButtonHandle = () => {
    dispatch(loginUser(login, password));
  };

  const logoutButtonHandle = () => {
    dispatch(logoutUser());
  };

  const onLoginChangedHandler = (val: string): void => {
    setLogin(val);
  };
  const onPasswordChangedHandler = (val: string): void => {
    setPassword(val);
  };

  useEffect(() => {
    if (auth.state === EAuthState.LOGGED) {
      history.push('/');
    } else {
      setPasswordMessage(auth.reason);
    }
  }, [auth, history]);

  useEffect(() => {
    dispatch(getUserData());
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
        {auth.state === EAuthState.LOGGED ? <Button className="logout_button" onClick={logoutButtonHandle} buttonType="round">logout</Button> : null}
        <Link className="login__link" to="/signup">Sign up</Link>
      </Form>
    </>
  );
};

export default Login;
