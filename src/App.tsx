import React from 'react';
import './styles/default.css';
import Arcanoid from 'Components/Arcanoid/index';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <Arcanoid margin={10} />
  </>

);

export default App;
