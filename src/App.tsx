import React from 'react';
import './styles/default.css';
import Register from 'Pages/Register/Register';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <Register caption="Register" />
  </>
);

export default App;
