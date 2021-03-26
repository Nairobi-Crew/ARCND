import { ProfileProps } from 'Pages/Profile/types';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import Form from 'UI/Form/Form';
import { globalBus } from 'Util/EventBus';
import { AUTH_SERVICE_EVENTS, USER_SERVICE_EVENTS, UserInfo } from '../../services/types';
import emailIsValid from '../../util/emailValidator';
import phoneIsValid from '../../util/phoneValidator';
import loginIsValid from '../../util/loginValidator';

const Profile: ProfileProps = ({ caption }) => {
  const [firstNameField, setFirstName] = useState('');
  const [secondNameField, setSecondName] = useState('');
  const [displayNameField, setDisplayName] = useState('');
  const [loginField, setLogin] = useState('');
  const [emailField, setEmail] = useState('');
  const [phoneField, setPhone] = useState('');
  const [avatarField, setAvatar] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [secondNameMessage, setSecondNameMessage] = useState('');
  const [formValid, setFormValid] = useState(true);

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
  useEffect(() => {
    setEmailMessage(emailIsValid(emailField) ? '' : 'Неверный email');
  }, [emailField]);
  useEffect(() => {
    setPhoneMessage(phoneIsValid(phoneField) ? '' : 'Неверный номер телефона');
  }, [phoneField]);
  useEffect(() => {
    setLoginMessage(loginIsValid(loginField) ? '' : 'Неверный логин');
  });
  useEffect(() => {
    setFirstNameMessage(firstNameField.trim().length === 0 ? 'Поле должно быть заполнено' : '');
  }, [firstNameField]);
  useEffect(() => {
    setSecondNameMessage(secondNameField.trim().length === 0 ? 'Поле должно быть заполнено' : '');
  }, [secondNameField]);
  useEffect(() => {
    setFormValid(`${emailMessage}${phoneMessage}${loginMessage}${secondNameMessage}${firstNameMessage}`.length === 0);
  }, [phoneMessage, emailMessage, loginMessage, firstNameMessage, secondNameMessage]);

  return (
    <Form caption={caption}>
      <img src={avatarField} width="50" height="50" alt="Avatar" />
      <Input
        id="firstName"
        value={firstNameField}
        onValueChanged={(val) => setFirstName(val)}
        label="Имя"
        errorMessage={firstNameMessage}
      />
      <Input
        id="secondName"
        value={secondNameField}
        onValueChanged={(val) => setSecondName(val)}
        label="Фамилия"
        errorMessage={secondNameMessage}
      />
      <Input
        id="displayName"
        value={displayNameField}
        onValueChanged={(val) => setDisplayName(val)}
        label="Имя в чате"
      />
      <Input
        id="login"
        value={loginField}
        onValueChanged={(val) => setLogin(val)}
        label="Логин"
        type="login"
        errorMessage={loginMessage}
      />
      <Input
        id="email"
        value={emailField}
        onValueChanged={(val) => setEmail(val)}
        label="Email"
        type="email"
        errorMessage={emailMessage}
      />
      <Input
        id="phone"
        value={phoneField}
        onValueChanged={(val) => setPhone(val)}
        label="Phone"
        type="phone"
        errorMessage={phoneMessage}
      />
      <Input
        id="avatar"
        value={avatarField}
        onValueChanged={(val) => setAvatar(val)}
        label="Avatar"
        type="file"
        accept="image/png, image/jpeg, image/svg+xml, image/svg"
      />

      <Button
        onClick={saveProfileButtonHandler}
        disabled={!formValid}
      >Сохранить</Button>
    </Form>
  );
};

export default Profile;
