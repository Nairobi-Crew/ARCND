import { defaultAuthReducer, IAuthUserReducer } from 'Reducers/auth/auth';
import { defaultUserReducer, IUserReducer } from 'Reducers/user/user';

export type Nullable<T> = T | null;

export interface IAppState {
  auth: IAuthUserReducer,
  user: IUserReducer,
}

export const initialAppState: IAppState = {
  auth: defaultAuthReducer,
  user: defaultUserReducer,
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
