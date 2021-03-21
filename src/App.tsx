import React from 'react';
import './styles/default.css';
import Profile from 'Pages/Profile/Profile';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <Profile caption="Profile form" />
  </>
);

export default App;
