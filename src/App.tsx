import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './styles/default';
import Arcanoid from 'Components/Arcanoid/Arcanoid';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <h1>HOMEEEE</h1>
        </Route>
        <Route path="/about">
          <p>kek</p>
        </Route>
        <Route path="/topics">
          <Link to="/game">Home</Link>
        </Route>
        <Route path="/">
          <Arcanoid />
        </Route>
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
