import { OAuthAction } from 'Reducers/oauth/oauth';
import { Dispatch } from 'react';
import { EOAuthState } from 'Reducers/oauth/types';
import { API_PATH, OAUTH_PATH } from 'Config/config';

const OAUTH_API = `${API_PATH}${OAUTH_PATH}`;

export const serviceIdAction = (uri: string) => (dispatch: Dispatch<OAuthAction>) => {
  fetch(`${OAUTH_API}/service-id?redirect_uri=${uri}`, { method: 'GET' }).then(async (response) => {
    const result = await response.json();
    dispatch({ type: EOAuthState.SET_ID, payload: result.service_id });
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('OAuth Error', error);
    dispatch({ type: EOAuthState.SET_ID, payload: '' });
  });
};

export const signInOAuthAction = (code: string, redirect_uri: string) => (dispatch: Dispatch<OAuthAction>) => {
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
    // eslint-disable-next-line no-console
    console.log('OAUTH Error', error);
  });
};

export const clearRedirectState = () => (dispatch: Dispatch<OAuthAction>) => {
  dispatch({ type: EOAuthState.UNKNOWN });
};
