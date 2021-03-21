import { ProfileProps } from 'Pages/Profile/types';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { AUTH_SERVICE_EVENTS, USER_SERVICE_EVENTS } from 'Config/types';
import Form from 'UI/Form/Form';
import { globalBus } from '../../util/EventBus';
import { UserInfo } from '../../services/AuthService';

const Profile: ProfileProps = ({ caption }) => {
  const [firstNameField, setFirstName] = useState('');
  const [secondNameField, setSecondName] = useState('');
  const [displayNameField, setDisplayName] = useState('');
  const [loginField, setLogin] = useState('');
  const [emailField, setEmail] = useState('');
  const [phoneField, setPhone] = useState('');
  const [avatarField, setAvatar] = useState('');

  const saveProfileButtonHandler = () => {
    const params: UserInfo = {
      first_name: firstNameField,
      second_name: secondNameField,
      display_name: displayNameField,
      phone: phoneField,
      login: loginField,
      avatar: avatarField,
      email: emailField,
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
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_GET_INFO);
    globalBus.on(AUTH_SERVICE_EVENTS.GET_INFO_DONE, ({ data, status }) => {
      if (status !== 200) {
        // alert('Get user information error');
      }
      setLogin(data.login);
      setFirstName(data.first_name);
      setSecondName(data.second_name);
      setDisplayName(data.display_name);
      setEmail(data.email);
      setPhone(data.phone);
      setAvatar(data.avatar);
    });
    globalBus.on(AUTH_SERVICE_EVENTS.GET_INFO_ERROR, ({ data, status }) => {
      console.log('Get user error', { data, status });
    });
  }, []);

  return (
    <Form>
      <h1>{caption}</h1>
      <Input id="firstName" value={firstNameField} onValueChanged={(val) => setFirstName(val)} label="Имя" />
      <Input id="secondName" value={secondNameField} onValueChanged={(val) => setSecondName(val)} label="Фамилия" />
      <Input id="displayName" value={displayNameField} onValueChanged={(val) => setDisplayName(val)} label="Имя в чате" />
      <Input id="login" value={loginField} onValueChanged={(val) => setLogin(val)} label="Логин" type="login" />
      <Input id="email" value={emailField} onValueChanged={(val) => setEmail(val)} label="Email" type="email" />
      <Input id="phone" value={phoneField} onValueChanged={(val) => setPhone(val)} label="Phone" type="phone" />
      <Input id="avatar" value={avatarField} onValueChanged={(val) => setAvatar(val)} label="Avatar" type="file" accept="image/png, image/jpeg, image/svg+xml, image/svg" />

      <Button onClick={saveProfileButtonHandler}>Сохранить</Button>
    </Form>
  );
};

export default Profile;
