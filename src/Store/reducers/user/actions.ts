import { IUser } from 'Store/types';
import { API_PATH, USER_PATH } from 'Config/config';
import { EUserAction } from 'Reducers/user/types';
import { UserAction } from 'Reducers/user/user';
import { Dispatch } from 'react';

const API = `${API_PATH}${USER_PATH}`;
export const changeProfile = (user: IUser) => async (dispatch: Dispatch<UserAction>) => {
  const response = await fetch(`${API}/profile`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  if (response.status === 200) {
    const data = await response.json();
    dispatch({ type: EUserAction.USER_CHANGE_PROFILE, payload: { user: data } });
  } else {
    const data = await response.json();
    dispatch({ type: EUserAction.ERROR_USER_CHANGE_PROFILE, payload: { reason: data.reason } });
  }
};

export const changePassword = (
  oldPassword: string,
  newPassword: string,
) => async (dispatch: Dispatch<UserAction>) => {
  const response = await fetch(`${API}/password`,
    {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  if (response.status === 200) {
    dispatch({ type: EUserAction.USER_CHANGE_PASSWORD });
  } else if (response.status === 400) {
    const data = await response.json();
    dispatch({ type: EUserAction.ERROR_USER_CHANGE_PASSWORD, payload: { reason: data.reason } });
  } else if (response.status === 401) {
    dispatch({ type: EUserAction.ERROR_USER_CHANGE_PASSWORD, payload: { reason: 'Unauthorized' } });
  } else {
    dispatch({ type: EUserAction.ERROR_USER_CHANGE_PASSWORD, payload: { reason: 'Unknown error' } });
  }
};

export const changeAvatar = (avatar: Blob) => async (dispatch: Dispatch<UserAction>) => {
  try {
    // создаем объект для чтения файла
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = async () => { // при окончании загрузки файла
      const a = new FormData();
      a.append('avatar', avatar);
      const response = await fetch(`${API}user/profile/avatar`,
        {
          method: 'PUT',
          credentials: 'include',
          body: JSON.stringify(a),
          headers: { Accept: 'application/json' },
        });
      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: EUserAction.USER_CHANGE_AVATAR, payload: { user: data } });
      } else if (response.status === 400) {
        const data = await response.json();
        dispatch({ type: EUserAction.ERROR_USER_CHANGE_AVATAR, payload: { reason: data.reason } });
      } else {
        dispatch({ type: EUserAction.ERROR_USER_CHANGE_AVATAR, payload: { reason: 'Unknown error' } });
      }
    };
    fileReader.readAsDataURL(avatar as Blob);// загружаем
  } catch (e) {
    dispatch({ type: EUserAction.ERROR_USER_CHANGE_AVATAR, payload: { reason: 'Unknown error' } });
  }
};

export const getUserById = (id: number) => async (dispatch: Dispatch<UserAction>) => {
  const response = await fetch(`${API}/${id}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  if (response.status === 200) {
    const user = await response.json();
    dispatch({ type: EUserAction.USER_GET_INFO_BY, payload: { user } });
  } else if (response.status === 400) {
    const { reason } = await response.json();
    dispatch({ type: EUserAction.ERROR_USER_GET_INFO_BY, payload: { reason } });
  } else {
    const reason = 'Unknown error';
    dispatch({ type: EUserAction.ERROR_USER_GET_INFO_BY, payload: { reason } });
  }
};

export const clearLastAction = () => (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: EUserAction.USER_UNKNOWN });
};
