import { ChangePasswordProps } from 'Pages/ChangePassword/types';
import { useHistory } from 'react-router-dom';
import Form from 'UI/Form/Form';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { globalBus } from 'Util/EventBus';
import { USER_SERVICE_EVENTS } from '../../services/types';

const ChangePassword: React.FC<ChangePasswordProps> = ({ caption }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState('');
  const [password1ErrorMessage, setPassword1ErrorMessage] = useState('');
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState('');
  const history = useHistory();
  useEffect(() => {
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_DONE, () => {
      history.push('/profile');
    });
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_ERROR, ({ data }) => {
      setOldPasswordErrorMessage(data as string);
      // console.log('Password change error', error);
    });
  }, []);

  const changePasswordHandler = () => {
    if (password1 !== password2) {
      return;
    }
    globalBus.emit(USER_SERVICE_EVENTS.DO_PASSWORD_CHANGE, oldPassword, password1);
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
