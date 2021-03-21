import React from 'react';
import './styles/default.css';
import ChangePassword from 'Pages/ChangePassword/ChangePassword';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <ChangePassword caption="Change password" />
  </>
);

export default App;
