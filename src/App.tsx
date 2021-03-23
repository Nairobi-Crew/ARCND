import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './styles/default';
import Arcanoid from 'Components/Arcanoid/Arcanoid';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';
import Login from 'Pages/Login/Login'
authService.dummy();
userService.dummy();

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <p>Registration</p>
        </Route>
        <Route path="/">
          <Arcanoid />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
