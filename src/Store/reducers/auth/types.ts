export interface IUser {
  first_name: string,
  second_name: string
  display_name: string
  phone: string
  email: string
  login: string,
  id: number
  avatar?: string
}

export enum EUserState {
  LOGGED = 'LOGGED',
  LOGIN_ERROR = 'LOGIN_ERROR',
  PENDING = 'PENDING',
  UNKNOWN = 'UNKNOWN',
  LOGOUT = 'LOGOUT'
}

export enum EUserAction {
  AUTH_LOGIN = 'AUTH:LOGIN',
  AUTH_LOGOUT = 'AUTH:LOGOUT',
  AUTH_LOGIN_ERROR = 'AUTH:LOGOUT',
  USER_GET_DATA = 'USER:GET_DATA'
}
