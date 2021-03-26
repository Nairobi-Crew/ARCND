import './common/common.scss'

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Arcanoid from 'Components/Arcanoid/Arcanoid';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';
import Login from 'Pages/Login/Login';
import Registration from 'Pages/Register/Register';
import Leaderboard from "Pages/Leaderboard/Leaderboard";

authService.dummy();
userService.dummy();

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/signup">
        <Registration />
      </Route>
      <Route path="/leaderboard">
        <Leaderboard/>
      </Route>
      <Route path="/game">
        <Arcanoid margin={10}/>
      </Route>
      <Route path="/">
        <Redirect to="/signin" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
