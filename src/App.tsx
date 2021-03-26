import './common/common.scss';

import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Arcanoid from 'Components/Arcanoid/Arcanoid';
import Login from 'Pages/Login/Login';
import Registration from 'Pages/Register/Register';
import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import Forum from 'Pages/Forums/Forum/Forum';
import Profile from 'Pages/Profile/Profile';
import Thread from 'Pages/Forums/Thread/Thread';
import {userService} from './services/UserService';
import {authService} from './services/AuthService';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';

authService.dummy();
userService.dummy();


const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        </Route>
        <Route path="/signup">

          <ErrorBoundary>
            <Registration />
          </ErrorBoundary>
        </Route>
        <Route path="/leaderboard">

          <ErrorBoundary>
            <Leaderboard />
          </ErrorBoundary>
        </Route>
        <Route path="/forum">

          <ErrorBoundary>
            <Forum />
          </ErrorBoundary>
        </Route>
        <Route path="/profile">

          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </Route>
        <Route path="/thread/:threadId">

          <ErrorBoundary>
            <Thread />
          </ErrorBoundary>
        </Route>
        <Route path="/" exact>

          <ErrorBoundary>
            <Arcanoid margin={10} />
          </ErrorBoundary>
        </Route>
      </Switch>
    </BrowserRouter>
  </>

);

export default App;
