import { ChangePasswordProps } from 'Pages/ChangePassword/types';
import Form from 'UI/Form/Form';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { USER_SERVICE_EVENTS } from '../../services/types';
import { globalBus } from '../../util/EventBus';

const ChangePassword: ChangePasswordProps = ({ caption }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1ErrorMessage, setPassword1ErrorMessage] = useState('');
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState('');
  useEffect(() => {
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_DONE, () => {
      console.log('Password changed');
    });
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_ERROR, (error) => {
      console.log('Password change error', error);
    });
  }, []);
  useEffect(() => {
    if (password1.length < 8) {
      setPassword1ErrorMessage('Пароль слишком короткий');
    } else {
      setPassword1ErrorMessage('');
    }
    if (password1 !== password2) {
      setPassword2ErrorMessage('Пароли не совпадают');
    } else {
      setPassword2ErrorMessage('');
    }
  }, [password1, password2]);
  const changePasswordHandler = () => {
    if (password1 !== password2) {
      return;
    }
    globalBus.emit(USER_SERVICE_EVENTS.DO_PASSWORD_CHANGE, oldPassword, password1);
  };
  return (
    <Form caption={caption}>
      <Input label="Старый пароль" id="oldPassword" value={oldPassword} onValueChanged={(val) => setOldPassword(val)} type="password" />
      <Input label="Новый пароль" id="password1" value={password1} onValueChanged={(val) => setPassword1(val)} type="password" errorMessage={password1ErrorMessage} />
      <Input label="Повтор пароля" id="password2" value={password2} onValueChanged={(val) => setPassword2(val)} type="password" errorMessage={password2ErrorMessage} />
      <div>
        <span>
          -
        </span>
      </div>
      <Button onClick={changePasswordHandler}>Сменить пароль</Button>
    </Form>
  );
};

export default ChangePassword;
