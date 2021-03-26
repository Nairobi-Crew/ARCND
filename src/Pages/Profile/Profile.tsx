import { ProfileProps } from 'Pages/Profile/types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import Form from 'UI/Form/Form';
import { globalBus } from 'Util/EventBus';
import { AUTH_SERVICE_EVENTS, USER_SERVICE_EVENTS, UserInfo } from '../../services/types';
import emailIsValid from '../../util/emailValidator';
import phoneIsValid from '../../util/phoneValidator';
import loginIsValid from '../../util/loginValidator';

const Profile: React.FC<ProfileProps> = ({ caption }: ProfileProps) => {
  const [formVisible, setFormVisible] = useState(false);
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
  const [formValid, setFormValid] = useState(true);

  const history = useHistory();

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

  const saveProfileDone = ({ data, status }) => {
    console.log('Save profile done', { data, status });
  };

  const saveProfileError = ({ data, status }) => {
    console.log('Save profile error', { data, status });
  };

  const getUserInfoDone = ({ data, status }) => {
    if (status !== 200) {
      history.push('/signin');
      return;
    }
    setLogin(data.login);
    setFirstName(data.first_name);
    setSecondName(data.second_name || '');
    setDisplayName(data.display_name || '');
    setEmail(data.email);
    setPhone(data.phone);
    setAvatar(data.avatar || '');
    setFormVisible(true);
  };

  const getUserInfoError = ({ data, status }) => {
    if (status === 401) {
      history.push('/signin');
    }
    console.log('Get user error', { data, status });
  };

  useEffect(() => {
    globalBus.on(USER_SERVICE_EVENTS.PROFILE_DONE, saveProfileDone);
    globalBus.on(USER_SERVICE_EVENTS.PROFILE_ERROR, saveProfileError);
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_GET_INFO);
    globalBus.on(AUTH_SERVICE_EVENTS.GET_INFO_DONE, getUserInfoDone);
    globalBus.on(AUTH_SERVICE_EVENTS.GET_INFO_ERROR, getUserInfoError);
    return () => {
      globalBus.off(USER_SERVICE_EVENTS.PROFILE_DONE, saveProfileDone);
      globalBus.off(USER_SERVICE_EVENTS.PROFILE_ERROR, saveProfileError);
      globalBus.off(AUTH_SERVICE_EVENTS.GET_INFO_DONE, getUserInfoDone);
      globalBus.off(AUTH_SERVICE_EVENTS.GET_INFO_ERROR, getUserInfoError);
    };
  }, []);

  useEffect(() => {
    setFormValid(`${emailMessage}${phoneMessage}${loginMessage}${firstNameMessage}`.length === 0);
  }, [phoneMessage, emailMessage, loginMessage, firstNameMessage]);

  return (
    <>
      <Form caption={caption || 'Профиль'} visible={formVisible}>
        <div style={{ textAlign: 'center' }}>
          {avatarField ? <img src={avatarField} width="50" height="50" alt="Avatar" /> : ''}

        </div>
        <Input
          value={firstNameField}
          onValueChanged={(val) => setFirstName(val)}
          label="Имя"
          errorMessage={firstNameMessage}
          onBlur={() => setFirstNameMessage(firstNameField.trim().length === 0 ? 'Поле должно быть заполнено' : '')}
        />
        <Input
          value={secondNameField}
          onValueChanged={(val) => setSecondName(val)}
          label="Фамилия"
          onBlur={() => setFirstNameMessage(secondNameField.trim().length === 0 ? 'Поле должно быть заполнено' : '')}
        />
        <Input
          value={displayNameField}
          onValueChanged={(val) => setDisplayName(val)}
          label="Имя в чате"
        />
        <Input
          value={loginField}
          onValueChanged={(val) => setLogin(val)}
          label="Логин"
          type="login"
          errorMessage={loginMessage}
          onBlur={() => setLoginMessage(loginIsValid(loginField) ? '' : 'Неверный логин')}
        />
        <Input
          value={emailField}
          onValueChanged={(val) => setEmail(val)}
          label="Email"
          type="email"
          errorMessage={emailMessage}
          onBlur={() => setEmailMessage(emailIsValid(emailField) ? '' : 'Неверный email')}
        />
        <Input
          value={phoneField}
          onValueChanged={(val) => setPhone(val)}
          label="Phone"
          type="phone"
          errorMessage={phoneMessage}
          onBlur={() => setPhoneMessage(phoneIsValid(phoneField) ? '' : 'Неверный номер телефона')}
        />

        <Button onClick={saveProfileButtonHandler} disabled={!formValid}>Сохранить</Button>
      </Form>
    </>
  );
};

export default Profile;
