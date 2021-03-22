import { API_URL } from 'Config/config';
import { METHODS, USER_SERVICE_EVENTS } from './types';
import { UserInfo } from './AuthService';
import { globalBus } from '../util/EventBus';

export type UserServiceOptions = {
    apiUrl?: string
    profilePath?: string
    avatarPath?: string
    passwordPath?: string
    getInfoPath?: string
    searchPath?: string
}

/**
 * Серзис работы с поользователями
 */
export class UserService {
    private static instance: UserService

    private options: UserServiceOptions

    /**
     * @param {UserServiceOptions} options
     */
    constructor(options: UserServiceOptions = {}) {
      if (UserService.instance) {
        return UserService.instance;
      }
      this.options = {
        apiUrl: API_URL,
        profilePath: 'user/profile',
        avatarPath: 'user/profile/avatar',
        passwordPath: 'user/password',
        getInfoPath: 'user',
        searchPath: 'user/search',
        ...options,
      };
      UserService.instance = this;
    }

    /**
     * Изменение текущего профиля
     * @param {UserInfo} user
     * @param {string} method - POST по умолчанию
     * @return {Promise}
     */
    changeProfile(user: UserInfo,
      method: string = METHODS.PUT): void {
      fetch(`${this.options.apiUrl}${this.options.profilePath}`,
        {
          method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
        .then((response) => {
          const event = response.status === 200
            ? USER_SERVICE_EVENTS.PROFILE_DONE
            : USER_SERVICE_EVENTS.PROFILE_ERROR;
          response.json().then((data) => {
            globalBus.emit(event, { data, status: response.status });
          }).catch((error) => {
            globalBus.emit(event, { data: error, status: response.status });
          });
        })
        .catch((error) => {
          globalBus.emit(USER_SERVICE_EVENTS.PROFILE_ERROR, { data: error, status: 0 });
        });
    }

    /**
     * Изменение аватара
     * @param {string | Blob} avatar
     * @param {string} method
     * @return {Promise}
     */
    changeAvatar(avatar: string | Blob,
      method: string = METHODS.PUT): void {
      try {
        // создаем объект для чтения файла
        const fileReader: FileReader = new FileReader();
        fileReader.onloadend = () => { // при окончании загрузки файла
          const a = new FormData();
          a.append('avatar', avatar);
          fetch(`${this.options.apiUrl}${this.options.avatarPath}`,
            {
              method,
              credentials: 'include',
              body: JSON.stringify(a),
              headers: { Accept: 'application/json' },
            })
            .then((response) => {
              const event = response.status === 200
                ? USER_SERVICE_EVENTS.AVATAR_DONE
                : USER_SERVICE_EVENTS.AVATAR_ERROR;
              response.json().then((data) => {
                globalBus.emit(event, { data, status: response.status });
              }).catch((error) => {
                globalBus.emit(
                  USER_SERVICE_EVENTS.AVATAR_ERROR,
                  { data: error, status: response.status },
                );
              });
            })
            .catch((error) => {
              globalBus.emit(USER_SERVICE_EVENTS.AVATAR_ERROR, { data: error, status: 0 });
            });
        };
        fileReader.readAsDataURL(avatar as Blob);// загружаем
      } catch (e) {
        globalBus.emit(USER_SERVICE_EVENTS.AVATAR_ERROR, { data: e, status: 0 });
      }
    }

    /**
     * Измемение пароля
     * @param {string} oldPassword: string текущий пароль
     * @param {string} newPassword: string новый пароль
     * @param {string} method
     * @return {Promise}
     */
    changePassword(oldPassword: string, newPassword: string,
      method: string = METHODS.PUT): void {
      fetch(`${this.options.apiUrl}${this.options.passwordPath}`,
        {
          method,
          body: JSON.stringify({ oldPassword, newPassword }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const event = response.status === 200
            ? USER_SERVICE_EVENTS.PASSWORD_DONE
            : USER_SERVICE_EVENTS.PASSWORD_ERROR;
          globalBus.emit(event, { data: response, status: response.status });
        })
        .catch((error) => {
          globalBus.emit(USER_SERVICE_EVENTS.PASSWORD_ERROR, { data: error, status: 0 });
        });
    }

    /**
     * Получить информацию по идентификатору пользователя
     * @param {number} id
     * @param {string} method
     * @return {Promise<UserInfo>}
     */
    getInfoById(id: number, method: string = METHODS.GET): void {
      fetch(`${this.options.apiUrl}${this.options.getInfoPath}/${id}`,
        {
          method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          try {
            globalBus.emit(USER_SERVICE_EVENTS.GET_INFO_DONE, response.json());
          } catch (e) {
            globalBus.emit(USER_SERVICE_EVENTS.GET_INFO_ERROR, e);
          }
        })
        .catch((error) => {
          globalBus.emit(USER_SERVICE_EVENTS.GET_INFO_ERROR, error);
        });
    }

    /**
     * Поиск пользователя по логину
     * @param {string} login: string
     * @param {string} method
     * @return {Promise}
     */
    search(login: string, method: string = METHODS.POST): void {
      fetch(`${this.options.apiUrl}${this.options.searchPath}`,
        {
          method,
          body: JSON.stringify({ login }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          globalBus.emit(USER_SERVICE_EVENTS.SEARCH_DONE, response);
        })
        .catch((error) => {
          globalBus.emit(USER_SERVICE_EVENTS.SEARCH_ERROR, error);
        });
    }

    /**
   * Dummy method
   */
    // eslint-disable-next-line class-methods-use-this
    dummy(): void {
      // doNothing
    }
}

export const userService = new UserService();
globalBus.on(USER_SERVICE_EVENTS.DO_PROFILE_CHANGE, (params: UserInfo) => {
  userService.changeProfile(params);
});
globalBus.on(USER_SERVICE_EVENTS.DO_PASSWORD_CHANGE, (oldPassword, newPassword) => {
  userService.changePassword(oldPassword as string, newPassword as string);
});
globalBus.on(USER_SERVICE_EVENTS.DO_AVATAR_CHANGE, (avatar: string | Blob) => {
  userService.changeAvatar(avatar);
});
