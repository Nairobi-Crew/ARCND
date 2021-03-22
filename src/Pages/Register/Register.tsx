import React, { useEffect, useState } from 'react';
import { RegisterProps } from 'Pages/Register/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { AUTH_SERVICE_EVENTS } from '../../services/types';
import { globalBus } from '../../util/EventBus';
import { AuthServiceSignup } from '../../services/AuthService';

const Register: RegisterProps = ({ caption }) => {
  const [secondName, setSecondName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const LogoutButtonHandler = () => {
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_LOGOUT);
  };
  const registerButtonHandler = () => {
    if (password1 !== password2) {
      alert('Error');
      return;
    }
    const params: AuthServiceSignup = {
      phone,
      second_name: secondName,
      first_name: firstName,
      login,
      email,
      password: password1,
    };
    globalBus.emit(AUTH_SERVICE_EVENTS.DO_SIGNUP, params);
  };

  useEffect(() => {
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNUP_DONE, (answer, status) => {
      console.log('Signup done', { answer, status });
    });
    globalBus.on(AUTH_SERVICE_EVENTS.SIGNUP_ERROR, (answer, status) => {
      console.log('Signup ERROR', { answer, status });
    });
  }, []);
  return (
    <Form caption={caption}>
      <Input label="Фамилия" onValueChanged={(val) => setSecondName(val)} value={secondName} />
      <Input label="Имя" onValueChanged={(val) => setFirstName(val)} value={firstName} />
      <Input label="Логин" onValueChanged={(val) => setLogin(val)} value={login} />
      <Input label="E-Mail" onValueChanged={(val) => setEmail(val)} value={email} />
      <Input label="Phone" onValueChanged={(val) => setPhone(val)} value={phone} />
      <Input type="password" label="Пароль" onValueChanged={(val) => setPassword1(val)} value={password1} />
      <Input type="password" label="Повтор" onValueChanged={(val) => setPassword2(val)} value={password2} />
      <Button onClick={registerButtonHandler}>Зарегистрироваться</Button>
      <Button onClick={LogoutButtonHandler}>Logout</Button>
    </Form>
  );
};

export default Register;