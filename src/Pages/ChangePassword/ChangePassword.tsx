import { ChangePasswordProps } from 'Pages/ChangePassword/types';
import { useHistory } from 'react-router-dom';
import Form from 'UI/Form/Form';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { createSelector } from 'reselect';
import { IAppState } from 'Store/types';
import { IUserReducer } from 'Reducers/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { EUserAction } from 'Reducers/user/types';
import { changePassword, clearLastAction } from 'Reducers/user/actions';

const ChangePassword: React.FC<ChangePasswordProps> = ({ caption }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1ErrorMessage, setPassword1ErrorMessage] = useState('');
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState('');
  const history = useHistory();

  const userSelector = createSelector(
    (state: IAppState) => state.user,
    (user) => user,
  );

  const user = useSelector(
    (state: IAppState) => userSelector(state),
  ) as IUserReducer;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('User change', user);
    if (user.state === EUserAction.USER_CHANGE_PASSWORD) {
      dispatch(clearLastAction());
      history.goBack();
    } else {
      setOldPasswordErrorMessage(user.reason);
    }
  }, [user]);

  useEffect(() => {
    if (user.state !== EUserAction.USER_UNKNOWN) {
      dispatch(clearLastAction());
      console.log('', user);
    }
  }, []);

  const changePasswordHandler = () => {
    if (password1 === password2 && password1ErrorMessage + password2ErrorMessage === '') {
      dispatch(changePassword(oldPassword, password1));
    }
  };

  const onBlurPassword2Handler = () => {
    if (password1 !== password2) {
      setPassword2ErrorMessage('Пароли не совпадают');
    } else {
      setPassword2ErrorMessage('');
    }
  };

  const onBlurPassword1Handler = () => {
    if (password1.length < 8) {
      setPassword1ErrorMessage('Пароль слишком короткий');
    } else {
      setPassword1ErrorMessage('');
    }
  };

  return (
    <Form caption={caption || 'Change password'}>
      <Input
        label="Старый пароль"
        value={oldPassword}
        onValueChanged={(val) => setOldPassword(val)}
        type="password"
        errorMessage={oldPasswordErrorMessage}
      />
      <Input
        onBlur={onBlurPassword1Handler}
        label="Новый пароль"
        id="password1"
        value={password1}
        onValueChanged={(val) => setPassword1(val)}
        type="password"
        errorMessage={password1ErrorMessage}
      />
      <Input
        onBlur={onBlurPassword2Handler}
        label="Повтор пароля"
        id="password2"
        value={password2}
        onValueChanged={(val) => setPassword2(val)}
        type="password"
        errorMessage={password2ErrorMessage}
      />
      <Button onClick={changePasswordHandler}>Сменить пароль</Button>
    </Form>
  );
};

export default ChangePassword;
