import { EAuthAction, EAuthState } from 'Reducers/auth/types';
import { IUser, Nullable } from 'Store/types';

export interface IAuthUserReducer {
  user: Nullable<IUser>
  loggedTime: number
  state: EAuthState
  reason: string
}

export const defaultAuthReducer: IAuthUserReducer = {
  state: EAuthState.UNKNOWN,
  loggedTime: 0,
  user: null,
  reason: '',
};

export function authReducer(
  state: IAuthUserReducer = defaultAuthReducer,
  action,
): IAuthUserReducer {
  switch (action.type) {
    case EAuthAction.AUTH_LOGIN:
      return { ...state, state: EAuthState.LOGGED };
    case EAuthAction.AUTH_LOGOUT:
      return { ...state, state: EAuthState.LOGOUT };
    case EAuthAction.USER_GET_DATA:
      return { ...state, user: action.payload.user, state: action.payload.status };
    case EAuthAction.AUTH_LOGIN_ERROR:
      return { ...state, state: EAuthState.LOGIN_ERROR, reason: action.payload.reason };
    default:
      return state;
  }
}
