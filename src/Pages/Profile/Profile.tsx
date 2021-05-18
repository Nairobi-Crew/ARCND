import { ProfileProps } from 'Pages/Profile/types';
import React, { useEffect, useState } from 'react';
import Input from 'UI/Input/index';
import Button from 'UI/Button/index';
import Form from 'UI/Form/index';
import { IUser } from 'Store/types';
import { useDispatch } from 'react-redux';
import { changeProfile } from 'Reducers/user/actions';
import { EAuthState } from 'Reducers/auth/types';
import { getUserData } from 'Reducers/auth/actions';
import { useAuthReselect } from 'Store/hooks';
import emailIsValid from '../../util/emailValidator';
import phoneIsValid from '../../util/phoneValidator';
import loginIsValid from '../../util/loginValidator';

const Profile: React.FC<ProfileProps> = ({ caption }: ProfileProps) => {
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
  const auth = useAuthReselect();
  const dispatch = useDispatch();

  const saveProfileButtonHandler = () => {
    const user: IUser = {
      avatar: avatarField,
      first_name: firstNameField,
      second_name: secondNameField,
      email: emailField,
      phone: phoneField,
      display_name: displayNameField,
      login: loginField,
      id: auth?.user?.id,
    };
    dispatch(changeProfile(user));
  };

  const getUserInfo = () => {
    if (!auth || !auth.user) {
      return;
    }
    setLogin(auth.user.login);
    setFirstName(auth.user.first_name);
    setSecondName(auth.user.second_name || '');
    setDisplayName(auth.user.display_name || '');
    setEmail(auth.user.email);
    setPhone(auth.user.phone);
    setAvatar(auth.user.avatar || '');
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    setFormValid(`${emailMessage}${phoneMessage}${loginMessage}${firstNameMessage}`.length === 0);
  }, [phoneMessage, emailMessage, loginMessage, firstNameMessage]);

  useEffect(() => {
    if (auth.state === EAuthState.LOGGED && !auth.user) {
      dispatch(getUserData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Form caption={caption || 'Профиль'}>
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
