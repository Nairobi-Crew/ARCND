import { EThemeAction } from 'Reducers/theme/types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from 'Store/types';

// eslint-disable-next-line import/prefer-default-export
export const setUserTheme = (theme:string): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  try {
    await fetch('/theme', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify({ theme }),
    });
  } catch (e) {
    //
  }
  dispatch({ type: EThemeAction.SET_THEME, payload: { theme } });
};
