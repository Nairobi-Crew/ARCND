import React from 'react';
import './styles/default.css';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';
import Thread from 'Pages/Forums/Thread/Thread';
import {messages} from 'Pages/Forums/sampleData';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <Thread messages={messages.filter((item) => item.topic === '1')} />
  </>
);

export default App;
