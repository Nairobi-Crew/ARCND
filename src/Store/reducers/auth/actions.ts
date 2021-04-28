import { API_PATH, AUTH_PATH } from 'Config/config';
import { EAuthAction, EAuthState } from 'Reducers/auth/types';
import { IUser } from 'Store/types';

const API = `${API_PATH}${AUTH_PATH}`;
export const loginUser = (login: string, password: string) => async (dispatch) => {
  const response = await fetch(`${API}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });
  if (response.status === 200) {
    dispatch({ type: EAuthAction.AUTH_LOGIN });
  } else {
    const reason = await response.json();
    dispatch({ type: EAuthAction.AUTH_LOGIN_ERROR, payload: { reason } });
  }
};

export const getUserData = () => async (dispatch) => {
  const response = await fetch(`${API}/user`, {
    method: 'GET',
    credentials: 'include',
  });
  const { status } = response;
  const json = await response.json();
  if (status === 200) {
    const user: IUser = {
      display_name: json.display_name || '',
      first_name: json.first_name || '',
      second_name: json.second_name || '',
      email: json.email || '',
      phone: json.phone || '',
      id: json.id || 0,
      login: json.login || '',
    };
    dispatch({ type: EAuthAction.USER_GET_DATA, payload: { user, status: EAuthState.LOGGED } });
  } else {
    dispatch({ type: EAuthAction.AUTH_LOGIN_ERROR, payload: { reason: json.reason || '', status: EAuthState.LOGIN_ERROR } });
  }
};

export const logoutUser = () => async (dispatch) => {
  const response = await fetch(`${API}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (response.status === 200) {
    dispatch({ type: EAuthAction.AUTH_LOGOUT });
  } else {
    const reason = await response.json();
    dispatch({ type: EAuthAction.AUTH_LOGIN_ERROR, payload: { reason } });
  }
};
