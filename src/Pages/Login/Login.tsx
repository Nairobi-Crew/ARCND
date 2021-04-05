import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginProps } from 'Pages/Login/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { getUserData, loginUser, logoutUser } from 'Reducers/auth/actions';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { EUserState } from 'Reducers/auth/types';
import { IAppState } from 'Store/types';
import { IAuthUserReducer } from 'Reducers/auth/auth';

const Login: React.FC<LoginProps> = ({ caption }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const authState = createSelector(
    (state: IAppState) => state.auth,
    (auth) => auth as IAuthUserReducer,
  );
  const auth = useSelector<IAppState>((state) => authState(state)) as IAuthUserReducer;

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
    if (auth.state === EUserState.LOGGED) {
      history.push('/profile');
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
        <Button className="logout_button" onClick={logoutButtonHandle} buttonType="round">logout</Button>
        <a className="login__link" href="/signup">Sign up</a>
      </Form>
    </>
  );
};

export default Login;
