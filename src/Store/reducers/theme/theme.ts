import {EThemeAction,EThemeState} from "./types";

export interface IThemeReducer {
  color: string
  state: EThemeState
}

export const defaultThemeReducer: IThemeReducer = {
  color: 'dark',
  state: EThemeState.UNKNOWN,
};

export function themeReducer(
  state: IThemeReducer = defaultThemeReducer,
  action,
): IThemeReducer {
  console.log(action)
  switch (action.type) {
    case EThemeAction.SET_THEME:
      return { ...state, state: action.type, color: action.payload.color};
    default:
      return state;
  }
}
