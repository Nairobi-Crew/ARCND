import { IAppState, IUser } from 'Store/types';
import { API_PATH, USER_PATH } from 'Config/config';
import { EUserAction } from 'Reducers/user/types';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

const API = `${API_PATH}${USER_PATH}`;
export const changeProfile = (user: IUser, avatar: string | Blob | undefined): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
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
    try {
      const data = await response.json();
      dispatch({ type: EUserAction.USER_CHANGE_PROFILE, payload: { user: data } });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Error parse JSON', e);
    }
  } else {
    try {
      const data = await response.json();
      dispatch({ type: EUserAction.ERROR_USER_CHANGE_PROFILE, payload: { reason: data.reason } });
    } catch (e) {
      dispatch({ type: EUserAction.ERROR_USER_CHANGE_PROFILE, payload: { reason: 'Unknown error' } });
    }
  }
  if (avatar) {
    const url = `${API}/profile/avatar`;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const a = new FormData();
      a.append('avatar', avatar);
      fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Accept: 'Application/json',
        },
        body: a,
      })
        .then(async (result) => {
          const answer = await result.json();
          dispatch({ type: EUserAction.ERROR_USER_CHANGE_AVATAR, payload: answer });
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.log('Error', e);
        });
    };
    fileReader.readAsDataURL(avatar as Blob);
  }
};

export const changePassword = (
  oldPassword: string,
  newPassword: string,
): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
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

export const setTheme = (theme: string): ThunkAction<void, IAppState, unknown, Action<string>> => async () => {
  try {
    await fetch(`${API}/theme`,
      {
        method: 'PUT',
        body: JSON.stringify({ theme }),
        credentials: 'include',
        headers: {
          'Content-type': 'applications/json',
        },
      });
  } catch (e) {
    //
  }
};

export const getUserById = (id: number): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
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

export const clearLastAction = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EUserAction.USER_UNKNOWN });
};
