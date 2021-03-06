import React from 'react';
import Arcanoid from 'Components/Arcanoid/index';
import Login from 'Pages/Login';
import Profile from 'Pages/Profile/index';
import ChangePassword from 'Pages/ChangePassword/index';
import Register from 'Pages/Register/index';
import Forum from 'Pages/Forums/Forum/index';
import Logout from 'Pages/Logout/Logout';
import Page404 from 'Pages/404/404';
import Main from 'Pages/Main';
import Leaderboard from 'Pages/Leaderboard/index';
import NewTopic from 'Pages/Forums/NewTopic/index';
import Thread from 'Pages/Forums/Thread/index';
import OAuth from 'Pages/OAuth/index';
import { OAUTH_REDIRECT_PATH } from 'Config/config';
import UserInfoPage from 'Pages/Forums/UserInfoPage/index';
import Page500 from 'Pages/500/500';

export interface ILink {
  title: string
  visibility: 'never' | 'always' | 'auth' | 'unauth'
  exact: boolean
  key: string;
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  params?: Object
  showLayout?: boolean;
}

const routes: ILink[] = [
  {
    visibility: 'auth',
    exact: false,
    path: '/game',
    title: 'Игра',
    component: Arcanoid,
    key: 'game',
    showLayout: false,
  },
  {
    visibility: 'unauth',
    exact: false,
    path: '/signin',
    title: 'Вход',
    component: Login,
    key: 'login',
  },
  {
    visibility: 'auth',
    exact: false,
    path: '/profile',
    title: 'Профиль',
    component: Profile,
    key: 'profile',
  },
  {
    visibility: 'auth',
    exact: false,
    path: '/changepassword',
    title: 'Сменить пароль',
    component: ChangePassword,
    key: 'change_password',
  },
  {
    visibility: 'unauth',
    exact: false,
    path: '/signup',
    title: 'Зарегистрироваться',
    component: Register,
    key: 'register',
  },
  {
    visibility: 'auth',
    exact: false,
    path: '/forum',
    title: 'Форум',
    component: Forum,
    key: 'forum',
  },
  {
    visibility: 'auth',
    exact: false,
    path: '/signout',
    title: 'Выход',
    component: Logout,
    key: 'logout',
  },
  {
    visibility: 'auth',
    exact: false,
    path: '/leaderboard',
    title: 'Лидеры',
    component: Leaderboard,
    key: 'logout',
  },
  {
    visibility: 'never',
    exact: true,
    path: '/',
    title: 'Main',
    component: Main,
    key: 'Main',
  },
  {
    visibility: 'never',
    exact: false,
    title: '',
    path: '/newtopic',
    key: 'newtopic',
    component: NewTopic,
  },
  {
    visibility: 'never',
    exact: false,
    title: '',
    path: '/thread/:threadId',
    key: 'thread',
    component: Thread,
  },
  {
    visibility: 'never',
    exact: false,
    title: '',
    path: '/userinfo/:id',
    key: 'userinfo',
    component: UserInfoPage,
  },
  {
    visibility: 'never',
    exact: false,
    title: '',
    path: '/500',
    component: Page500,
    key: '503_found',
  },
  {
    visibility: 'always',
    exact: false,
    title: '',
    path: '/',
    component: Page404,
    key: 'not_found',
  },
  {
    visibility: 'never',
    exact: false,
    title: '',
    path: OAUTH_REDIRECT_PATH,
    component: OAuth,
    key: 'oauth',
  },
];

export default routes;
