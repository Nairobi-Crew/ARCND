import { EUserAction, EUserState, IUser } from 'Reducers/auth/types';

export type Nullable<T> = T | null;

export interface IAuthUserReducer {
  user: Nullable<IUser>
  loggedTime: number
  state: EUserState
  reason: string
}

export const defaultAuthReducer: IAuthUserReducer = {
  state: EUserState.UNKNOWN,
  loggedTime: 0,
  user: null,
  reason: '',
};

export function authReducer(
  state: IAuthUserReducer = defaultAuthReducer,
  action,
): IAuthUserReducer {
  switch (action.type) {
    case EUserAction.AUTH_LOGIN:
      return { ...state, state: EUserState.LOGGED };
    case EUserAction.AUTH_LOGOUT:
      return { ...state, state: EUserState.LOGOUT };
    case EUserAction.USER_GET_DATA:
      return { ...state, user: action.payload.user, state: action.payload.status };
    case EUserAction.AUTH_LOGIN_ERROR:
      return { ...state, state: EUserState.LOGIN_ERROR, reason: action.payload.reason };
    default:
      return state;
  }
}
