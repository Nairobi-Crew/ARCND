/* eslint-disable no-shadow */
export enum EAuthState {
  LOGGED = 'LOGGED',
  LOGIN_ERROR = 'LOGIN_ERROR',
  PENDING = 'PENDING',
  UNKNOWN = 'UNKNOWN',
  LOGOUT = 'LOGOUT'
}

export enum EAuthAction {
  AUTH_LOGIN = 'AUTH:LOGIN',
  AUTH_LOGOUT = 'AUTH:LOGOUT',
  AUTH_LOGIN_ERROR = 'AUTH:LOGIN_ERROR',
  USER_GET_DATA = 'USER:GET_DATA',
  AUTH_REGISTER = 'AUTH:REGISTER',
  AUTH_REGISTER_ERROR = 'AUTH:REGISTER_ERROR',
}

export type UserRegisterParams = {
  first_name: string
  second_name: string
  login: string
  phone: string
  email: string
  password: string
}
