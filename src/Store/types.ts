import {defaultAuthReducer, IAuthUserReducer} from 'Reducers/auth/auth';

export interface IAppState {
  auth: IAuthUserReducer,
}

export const initialAppState: IAppState = {
  auth: defaultAuthReducer,
};
