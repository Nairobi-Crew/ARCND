import React, { useEffect, useState } from 'react';
import { RegisterProps } from 'Pages/Register/types';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { AUTH_SERVICE_EVENTS } from 'Config/types';
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
      secondName,
      firstName,
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
    <Form>
      <h1>{caption}</h1>
      <Input id="second_name" label="Фамилия" onValueChanged={(val) => setSecondName(val)} />
      <Input id="first_name" label="Имя" onValueChanged={(val) => setFirstName(val)} />
      <Input id="login" label="Логин" onValueChanged={(val) => setLogin(val)} />
      <Input id="email" label="E-Mail" onValueChanged={(val) => setEmail(val)} />
      <Input id="phone" label="Phone" onValueChanged={(val) => setPhone(val)} />
      <Input type="password" id="password1" label="Пароль" onValueChanged={(val) => setPassword1(val)} />
      <Input type="password" id="password2" label="Повтор" onValueChanged={(val) => setPassword2(val)} />
      <Button onClick={registerButtonHandler}>Зарегистрироваться</Button>
      <Button onClick={LogoutButtonHandler}>Logout</Button>
    </Form>
  );
};

export default Register;
