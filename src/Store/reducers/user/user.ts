import { EUserAction } from 'Reducers/user/types';
import { IUser, Nullable } from 'Store/types';

export interface IUserReducer {
  reason: string
  user: Nullable<IUser>,
  state: EUserAction,
}

export const defaultUserReducer: IUserReducer = {
  reason: '',
  user: null,
  state: EUserAction.USER_UNKNOWN,
};

export function userReducer(
  state: IUserReducer = defaultUserReducer,
  action,
): IUserReducer {
  switch (action.type) {
    case EUserAction.USER_GET_INFO_BY:
      return {
        ...state, reason: '', user: action.payload.user, state: action.type,
      };
    case EUserAction.USER_CHANGE_AVATAR:
      const { user } = state;
      user.avatar = action.payload.user.avatar;
      return {
        ...state, reason: '', user, state: action.type,
      };
    case EUserAction.USER_CHANGE_PASSWORD:
      return { ...state, reason: '', state: action.type };
    case EUserAction.USER_CHANGE_PROFILE:
      return {
        ...state, reason: '', user: action.payload.user, state: action.type,
      };
    case EUserAction.ERROR_USER_CHANGE_PROFILE:
      return { ...state, reason: action.payload.reason, state: action.type };
    case EUserAction.ERROR_USER_CHANGE_PASSWORD:
      return { ...state, reason: action.payload.reason, state: action.type };
    case EUserAction.ERROR_USER_CHANGE_AVATAR:
      return { ...state, reason: action.payload.reason, state: action.type };
    case EUserAction.ERROR_USER_GET_INFO_BY:
      return { ...state, reason: action.payload.reason, state: action.type };
    case EUserAction.USER_UNKNOWN:
      return { ...state, reason: '', state: action.type };
    default:
      return state;
  }
}
