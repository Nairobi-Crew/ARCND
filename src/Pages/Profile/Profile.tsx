import { ProfileProps } from 'Pages/Profile/types';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { USER_SERVICE_EVENTS } from 'Config/types';
import { globalBus } from '../../util/EventBus';
import { UserInfo } from '../../services/AuthService';
import Form from 'UI/Form/Form';

const Profile: ProfileProps = ({ caption }) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  const saveProfileButtonHandler = () => {
    const params: UserInfo = {
      firstName,
      secondName,
      displayName,
      phone,
      login,
      avatar,
      email,
    };
    globalBus.emit(USER_SERVICE_EVENTS.DO_PROFILE_CHANGE, params);
  };

  useEffect(() => {
    globalBus.on(USER_SERVICE_EVENTS.PROFILE_DONE, (data, status) => {
      console.log('Save profile done', { data, status });
    });
    globalBus.on(USER_SERVICE_EVENTS.PROFILE_ERROR, (data, status) => {
      console.log('Save profile error', { data, status });
    });
  }, []);

  return (
    <Form>
      <h1>{caption}</h1>
      <Input id="firstName" onValueChanged={(val) => setFirstName(val)} label="Имя" />
      <Input id="secondName" onValueChanged={(val) => setSecondName(val)} label="Фамилия" />
      <Input id="displayName" onValueChanged={(val) => setDisplayName(val)} label="Имя в чате" />
      <Input id="login" onValueChanged={(val) => setLogin(val)} label="Логин" type="login" />
      <Input id="email" onValueChanged={(val) => setEmail(val)} label="Email" type="email" />
      <Input id="phone" onValueChanged={(val) => setPhone(val)} label="Phone" type="phone" />
      <Input id="phone" onValueChanged={(val) => setAvatar(val)} label="Avatar" type="file" accept="image/png, image/jpeg, image/svg+xml, image/svg" />

      <Button onClick={saveProfileButtonHandler}>Сохранить</Button>
    </Form>
  );
};

export default Profile;
