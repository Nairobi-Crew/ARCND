import { EThemeAction, EThemeState } from './types';

export interface IThemeReducer {
  color: string
  state: string
}

export const defaultThemeReducer: IThemeReducer = {
  color: 'dark',
  state: EThemeState.UNKNOWN,
};

export type ThemeAction = {
  state?: string
  type: string
  payload?: any
}

export function themeReducer(
  state: IThemeReducer = defaultThemeReducer,
  action: ThemeAction,
): IThemeReducer {
  // console.log(action, 'action');
  switch (action.type) {
    case EThemeAction.SET_THEME:
      return { ...state, state: action.type, color: action.payload.theme };
    default:
      return state;
  }
}
