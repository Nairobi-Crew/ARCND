import './common/common.scss';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Arcanoid from 'Components/Arcanoid/Arcanoid';
import Login from 'Pages/Login/Login';
import Registration from 'Pages/Register/Register';
import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import Forum from 'Pages/Forums/Forum/Forum';
import Profile from 'Pages/Profile/Profile';
import Thread from 'Pages/Forums/Thread/Thread';
import { userService } from './services/UserService';
import { authService } from './services/AuthService';

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
          <Registration />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/forum">
          <Forum />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/thread/:threadId">
          <Thread />
        </Route>
        <Route path="/" exact>
          <Arcanoid margin={10} />
        </Route>
      </Switch>
    </BrowserRouter>
  </>

);

export default App;
