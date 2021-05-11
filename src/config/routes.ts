import React from 'react';
import Arcanoid from 'Components/Arcanoid';
import Login from 'Pages/Login';
import Profile from 'Pages/Profile';
import ChangePassword from 'Pages/ChangePassword';
import Register from 'Pages/Register';
import Forum from 'Pages/Forums/Forum';
import Logout from 'Pages/Logout/Logout';
import Page404 from 'Pages/404/404';
import Main from 'Pages/Main';
import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import NewTopic from 'Pages/Forums/NewTopic';
import Thread from 'Pages/Forums/Thread';

export interface ILink {
  title: string
  visibility: 'never' | 'always' | 'auth' | 'unauth'
  exact : boolean
  key: string;
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
}

const routes: ILink[] = [
  {
    visibility: 'always',
    exact: false,
    path: '/game',
    title: 'Игра',
    component: Arcanoid,
    key: 'game',
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
    visibility: 'always',
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
    visibility: 'always',
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
    path: '/thread/:id',
    key: 'thread',
    component: Thread,
  },
  {
    visibility: 'always',
    exact: false,
    title: '',
    path: '/',
    component: Page404,
    key: 'not_found',
  },
];

export default routes;
