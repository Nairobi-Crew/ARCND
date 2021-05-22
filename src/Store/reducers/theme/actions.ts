import {EThemeState} from "Reducers/theme/types";

export const setUserTheme = (theme:boolean) => (dispatch) => {
  dispatch({ type: EThemeState.SET_THEME ,payload: { theme }});
};
