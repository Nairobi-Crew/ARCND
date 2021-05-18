import { API_PATH, AUTH_PATH } from 'Config/config';
import { EAuthAction, EAuthState, UserRegisterParams } from 'Reducers/auth/types';
import { IUser } from 'Store/types';
import { Dispatch } from 'react';
import { AuthAction } from 'Reducers/auth/auth';

const API = `${API_PATH}${AUTH_PATH}`;
export const loginUser = (
  login: string,
  password: string,
) => async (dispatch: Dispatch<AuthAction>) => {
  const response = await fetch(`${API}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
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

export const getUserData = () => async (dispatch: Dispatch<AuthAction>) => {
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

export const logoutUser = () => async (dispatch: Dispatch<AuthAction>) => {
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

export const registerUser = (params: UserRegisterParams) => async (dispatch: Dispatch<AuthAction>) => {
  fetch(`${API}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then((response) => {
    response.json().then((answer) => {
      dispatch({ type: EAuthAction.AUTH_REGISTER, payload: answer });
    }).catch((e) => dispatch({ type: EAuthAction.AUTH_REGISTER_ERROR, payload: e }));
  }).catch((error) => {
    dispatch({ type: EAuthAction.AUTH_REGISTER_ERROR, payload: error });
  });
};
