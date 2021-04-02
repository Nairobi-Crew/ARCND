import './common/common.scss';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Arcanoid from 'Components/Arcanoid/index';
import Login from 'Pages/Login/index';
import Registration from 'Pages/Register/Register';
import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import Forum from 'Pages/Forums/Forum/index';
import Profile from 'Pages/Profile/index';
import Thread from 'Pages/Forums/Thread/index';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import Page404 from 'Pages/404/404';
import { CANVAS_MARGIN } from 'Components/Arcanoid/settings';
import Main from 'Pages/Main/Main';
import { ILink } from 'Pages/Main/types';
import ChangePassword from 'Pages/ChangePassword/index';
import { authService } from './services/AuthService';
import { userService } from './services/UserService';

authService.dummy();
userService.dummy();

const items: ILink[] = [
  {
    auth: true,
    href: '/game',
    name: 'Игра',
  },
  {
    auth: false,
    href: '/signin',
    name: 'Вход',
  },
  {
    auth: true,
    href: '/profile',
    name: 'Профиль',
  },
  {
    auth: true,
    href: '/changepassword',
    name: 'Сменить пароль',
  },
  {
    auth: false,
    href: '/signup',
    name: 'Зарегистрироваться',
  },
  {
    auth: true,
    href: '/forum',
    name: 'Форум',
  },
];

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

        <Route path="/game" exact>
          <ErrorBoundary>
            <Arcanoid margin={CANVAS_MARGIN} />
          </ErrorBoundary>
        </Route>

        <Route path="/changepassword">
          <ErrorBoundary>
            <ChangePassword />
          </ErrorBoundary>
        </Route>

        <Route path="/">
          <ErrorBoundary>
            <Main items={items} auth={true} />
          </ErrorBoundary>
        </Route>

        <Route path="/">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  </>

);

export default App;
