import { EOAuthState } from './types';

export interface IOAuthReducer {
  serviceID: string
  redirectUrl: string
  state: EOAuthState
}

export const defaultOAuthReducer: IOAuthReducer = {
  serviceID: '',
  redirectUrl: '',
  state: EOAuthState.UNKNOWN,
};

export type OAuthAction = {
  type: string
  payload?: string
}

export function oauthReducer(state: IOAuthReducer = defaultOAuthReducer, action: OAuthAction): IOAuthReducer {
  switch (action.type) {
    case EOAuthState.SET_ID:
      return { ...state, serviceID: action.payload as string };
    case EOAuthState.SET_URL:
      return { ...state, redirectUrl: action.payload as string, state: EOAuthState.REDIRECT };
    case EOAuthState.UNKNOWN:
      return { ...state, state: EOAuthState.UNKNOWN, serviceID: '' };
    case EOAuthState.OAUTH_DONE:
      return { ...state, state: EOAuthState.OAUTH_DONE };
    default:
      return state;
  }
}
