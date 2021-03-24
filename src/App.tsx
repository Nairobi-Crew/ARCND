import React from 'react';
import './styles/default.css';
// import Arcanoid from 'Components/Arcanoid/Arcanoid';
import Canvas from 'Components/Arcanoid/Canvas/index';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <Canvas left={0} top={0} width={window.innerWidth - 50} height={window.innerHeight} />
  </>
);

export default App;
