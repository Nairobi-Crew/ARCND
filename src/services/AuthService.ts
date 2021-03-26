import { API_URL } from 'Config/config';
import { globalBus } from 'Util/EventBus';
import {
  AUTH_SERVICE_EVENTS, AuthServiceOptions, AuthServiceSignup, METHODS,
} from './types';

/**
 * синглтон для Auth operations
 */
export class AuthService {
    private static instance: AuthService

    private options: AuthServiceOptions;

    /**
     * @param {AuthServiceOptions} options
     */
    constructor(options: AuthServiceOptions = {}) {
      if (AuthService.instance) {
        return AuthService.instance;
      }
      this.options = {
        apiUrl: API_URL,
        signin: 'auth/signin',
        signup: 'auth/signup',
        user: 'auth/user',
        logout: 'auth/logout',
        ...options,
      };
      AuthService.instance = this;
    }

    /**
     * Логин
     * @param {string} login
     * @param {string} password
     * @param {string} method - POST по умолчанию
     */
    signin(
      login: string,
      password: string,
      method: string = METHODS.POST,
    ): void {
      fetch(`${this.options.apiUrl}${this.options.signin}`, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      }).then((answer) => {
        const event = answer.status === 200
          ? AUTH_SERVICE_EVENTS.SIGNUP_DONE
          : AUTH_SERVICE_EVENTS.SIGNUP_ERROR;
        const a = document.createElement('a');
        a.href = '/game';
        a.click();
        answer.json().then((data) => {
          globalBus.emit(event, { data, status: answer.status });
        }).catch((data) => {
          globalBus.emit(AUTH_SERVICE_EVENTS.SIGNIN_ERROR, { data, status: answer.status });
        });
      }).catch((error) => {
        globalBus.emit(AUTH_SERVICE_EVENTS.SIGNIN_ERROR, { data: error, status: 0 });
      });
    }

    /**
     * Регистрация
     * @param {AuthServiceSignup} params
     * @param {string} method - POST по умолчанию
     */
    signup(
      params: AuthServiceSignup,
      method: string = METHODS.POST,
    ): void {
      fetch(`${this.options.apiUrl}${this.options.signup}`, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }).then((response) => {
        response.json().then((data) => {
          const event = response.status === 200
            ? AUTH_SERVICE_EVENTS.SIGNUP_DONE
            : AUTH_SERVICE_EVENTS.SIGNUP_ERROR;
          globalBus.emit(event, { data, status: response.status });
        }).catch((e) => {
          globalBus.emit(AUTH_SERVICE_EVENTS.SIGNUP_ERROR, { data: e, status: response.status });
        });
      }).catch((error) => {
        globalBus.emit(AUTH_SERVICE_EVENTS.SIGNUP_ERROR, { data: error, status: 0 });
      });
    }

    /**
     * Логаут
     * @param {string} method
     */
    logout(method: string = METHODS.POST): void {
      fetch(`${this.options.apiUrl}${this.options.logout}`, {
        method,
        credentials: 'include',
      }).then((response) => {
        globalBus.emit(AUTH_SERVICE_EVENTS.LOGOUT_DONE, { data: {}, status: response.status });
      }).catch((data) => {
        globalBus.emit(AUTH_SERVICE_EVENTS.LOGOUT_ERROR, { data, status: 0 });
      });
    }

    /**
     * Данные профиля текущего пользователя
     * @param {string} method
     */
    getInfo(method: string = METHODS.GET): void {
      fetch(`${this.options.apiUrl}${this.options.user}`, {
        method,
        credentials: 'include',
      }).then((response) => {
        const event = response.status === 200
          ? AUTH_SERVICE_EVENTS.GET_INFO_DONE
          : AUTH_SERVICE_EVENTS.GET_INFO_ERROR;
        response.json().then((data) => {
          globalBus.emit(event, { data, status: response.status });
        }).catch((error) => {
          globalBus.emit(
            AUTH_SERVICE_EVENTS.GET_INFO_ERROR,
            {
              data: error,
              status: response.status,
            },
          );
        });
      }).catch((error) => {
        globalBus.emit(AUTH_SERVICE_EVENTS.GET_INFO_ERROR, { data: error, status: 0 });
      });
    }

    // eslint-disable-next-line class-methods-use-this
    dummy(): void {
      // do nothing
    }
}

export const authService = new AuthService();
globalBus.on(AUTH_SERVICE_EVENTS.DO_SIGNIN, (login, password) => {
  authService.signin(login as string, password as string);
});
globalBus.on(AUTH_SERVICE_EVENTS.DO_SIGNUP, (params: AuthServiceSignup) => {
  authService.signup(params);
});
globalBus.on(AUTH_SERVICE_EVENTS.DO_LOGOUT, () => {
  authService.logout();
});
globalBus.on(AUTH_SERVICE_EVENTS.DO_GET_INFO, () => {
  authService.getInfo();
});
