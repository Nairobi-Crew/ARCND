import {EThemeAction} from "Reducers/theme/types";
import {ThemeAction} from "Reducers/theme/theme";
import {Dispatch} from "redux";

export const setUserTheme = (theme:string) => (dispatch: Dispatch<ThemeAction>) => {
  dispatch({ type: EThemeAction.SET_THEME ,payload: { theme }});
};
