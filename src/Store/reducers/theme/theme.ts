import {EThemeAction,EThemeState} from "./types";

export interface IThemeReducer {
  color: string | any
  state: EThemeState
}

export const defaultThemeReducer: IThemeReducer = {
  color: 'dark',
  state: EThemeState.UNKNOWN,
};

export type ThemeAction = {
  state?: string
  type: EThemeAction
  payload?: any
}

export function themeReducer(
  state: IThemeReducer = defaultThemeReducer,
  action: ThemeAction,
): IThemeReducer {
  switch (action.type) {
    case EThemeAction.SET_THEME:
      return { ...state, color: action.payload.color};
    default:
      return state;
  }
}
