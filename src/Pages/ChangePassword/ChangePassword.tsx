import { ChangePasswordProps } from 'Pages/ChangePassword/types';
import Form from 'UI/Form/Form';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { USER_SERVICE_EVENTS } from 'Config/types';
import { globalBus } from '../../util/EventBus';

const ChangePassword: ChangePasswordProps = ({ caption }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  useEffect(() => {
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_DONE, () => {
      console.log('Password changed');
    });
    globalBus.on(USER_SERVICE_EVENTS.PASSWORD_ERROR, (error) => {
      console.log('Password change error', error);
    });
  }, []);
  const changePasswordHandler = () => {
    if (password1 !== password2) {
      return;
    }
    globalBus.emit(USER_SERVICE_EVENTS.DO_PASSWORD_CHANGE, oldPassword, password1);
  };
  return (
    <Form>
      <h1>{caption}</h1>
      <Input id="oldPassword" value={oldPassword} onValueChanged={(val) => setOldPassword(val)} type="password" />
      <Input id="password1" value={password1} onValueChanged={(val) => setPassword1(val)} type="password" />
      <Input id="password2" value={password2} onValueChanged={(val) => setPassword2(val)} type="password" />
      <Button onClick={changePasswordHandler}>Сменить пароль</Button>
    </Form>
  );
};

export default ChangePassword;
