import { EOAuthState } from 'Reducers/oauth/types';
import { API_PATH, OAUTH_PATH } from 'Config/config';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from 'Store/types';
import { Action } from 'redux';

const OAUTH_API = `${API_PATH}${OAUTH_PATH}`;

export const serviceIdAction = (uri: string): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  fetch(`${OAUTH_API}/service-id?redirect_uri=${uri}`, { method: 'GET' }).then(async (response) => {
    const result = await response.json();
    dispatch({ type: EOAuthState.SET_ID, payload: result.service_id });
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('OAuth Error', error);
    dispatch({ type: EOAuthState.SET_ID, payload: '' });
  });
};

export const signInOAuthAction = (code: string, redirect_uri: string): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  const body = JSON.stringify({
    code,
    redirect_uri,
  });
  fetch(`${OAUTH_API}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body,
  }).then(() => {
    dispatch({ type: EOAuthState.SET_URL, payload: redirect_uri });
  }).catch((error) => {
    dispatch({ type: EOAuthState.SET_URL, payload: redirect_uri });
    // eslint-disable-next-line no-console
    console.log('OAUTH Error', error);
  });
};

export const signInOAUthDoneAction = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EOAuthState.OAUTH_DONE });
};
