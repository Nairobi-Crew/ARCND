import React, { useEffect, useState } from 'react';
import { RegisterProps } from 'Pages/Register/types';
import Form from 'UI/Form/index';
import Input from 'UI/Input/index';
import Button from 'UI/Button/index';
import './Register.scss';

const Register: RegisterProps = ({ caption }) => {
  const [secondName, setSecondName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const LogoutButtonHandler = () => {

  };
  const registerButtonHandler = () => {
    if (password1 !== password2) {

    }
  };

  useEffect(() => {
  }, []);

  return (
    <Form caption={caption || 'SING UP'}>
      <Input
        label="Фамилия"
        onValueChanged={(val) => setSecondName(val)}
        value={secondName}
      />
      <Input
        label="Имя"
        onValueChanged={(val) => setFirstName(val)}
        value={firstName}
      />
      <Input
        label="Логин"
        onValueChanged={(val) => setLogin(val)}
        value={login}
      />
      <Input
        label="E-Mail"
        onValueChanged={(val) => setEmail(val)}
        value={email}
      />
      <Input
        label="Phone"
        onValueChanged={(val) => setPhone(val)}
        value={phone}
      />
      <Input
        type="password"
        label="Пароль"
        onValueChanged={(val) => setPassword1(val)}
        value={password1}
      />
      <Input
        type="password"
        label="Повтор"
        onValueChanged={(val) => setPassword2(val)}
        value={password2}
      />
      <Button
        className="registration__submit button button_type_rounded"
        onClick={registerButtonHandler}
      >
        Зарегистрироваться
      </Button>
      <Button
        className="button button_type_rounded"
        onClick={LogoutButtonHandler}
      >
        Logout
      </Button>
    </Form>
  );
};

export default Register;
