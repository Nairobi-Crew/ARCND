import { defaultAuthReducer, IAuthUserReducer } from 'Reducers/auth/auth';
import { defaultUserReducer, IUserReducer } from 'Reducers/user/user';
import { defaultGameReducer, IGameReducer } from 'Reducers/game/game';
import { defaultForumReducer } from 'Reducers/forum/forum';
import { IForumReducer } from 'Reducers/forum/types';

export type Nullable<T> = T | null;

export interface IAppState {
  auth: IAuthUserReducer,
  user: IUserReducer,
  game: IGameReducer,
  forum: IForumReducer,
}

export const initialAppState: IAppState = {
  auth: defaultAuthReducer,
  user: defaultUserReducer,
  game: defaultGameReducer,
  forum: defaultForumReducer,
};

export interface IUser {
  first_name: string,
  second_name: string
  display_name: string
  phone: string
  email: string
  login: string,
  id?: number
  avatar?: string
}
