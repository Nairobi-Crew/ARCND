export type TCallBack<T extends unknown = unknown> = (...args: T[]) => void;

export enum AUTH_SERVICE_EVENTS {
  DO_SIGNIN = 'AUTH_SERVICE_DO_SIGN_IN',
  DO_SIGNUP = 'AUTH_SERVICE_DO_SIGN_UP',
  DO_LOGOUT = 'AUTH_SERVICE_DO_LOGOUT',
  DO_GET_INFO = 'AUTH_SERVICE_DO_GET_INFO',
  SIGNIN_DONE = 'AUTH_SERVICE_SIGNIN_DONE',
  SIGNIN_ERROR = 'AUTH_SERVICE_SIGNIN_ERROR',
  SIGNUP_DONE = 'AUTH_SERVICE_SIGNUP_DONE',
  SIGNUP_ERROR = 'AUTH_SERVICE_SIGNUP_ERROR',
  LOGOUT_DONE = 'AUTH_SERVICE_LOGOUT_DONE',
  LOGOUT_ERROR = 'AUTH_SERVICE_LOGOUT_ERROR',
  GET_INFO_DONE = 'AUTH_SERVICE_GET_INFO_DONE',
  GET_INFO_ERROR = 'AUTH_SERVICE_GET_INFO_ERROR',
}

export enum USER_SERVICE_EVENTS {// события для шины событий
  DO_PROFILE_CHANGE = 'USER_SERVICE_DO_PROFILE_CHANGE',
  DO_PASSWORD_CHANGE = 'USER_SERVICE_DO_PASSWORD_CHANGE',
  DO_AVATAR_CHANGE = 'USER_SERVICE_DO_AVATAR_CHANGE',
  PROFILE_DONE = 'USER_SERVICE_PROFILE_DONE',
  PROFILE_ERROR = 'USER_SERVICE_PROFILE_ERROR',
  AVATAR_DONE = 'USER_SERVICE_AVATAR_DONE',
  AVATAR_ERROR = 'USER_SERVICE_AVATAR_ERROR',
  PASSWORD_DONE = 'USER_SERVICE_PASSWORD_DONE',
  PASSWORD_ERROR = 'USER_SERVICE_PASSWORD_ERROR',
  SEARCH_DONE = 'USER_SERVICE_SEARCH_DONE',
  SEARCH_ERROR = 'USER_SERVICE_SEARCH_ERROR',
  GET_INFO_DONE = 'USER_SERVICE_GET_INFO_DONE',
  GET_INFO_ERROR = 'USER_SERVICE_GET_INFO_ERROR',
}

export const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};


export type AuthServiceOptions = {
  apiUrl?: string
  signin?: string
  signup?: string
  user?: string
  logout?: string
  avatar?: string
}

export type AuthServiceSignup = { // поля для регистрации
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type UserInfo = {
  id?: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar?: string
}
