import { createSelector } from 'reselect';
import { IAppState } from 'Store/types';
import { useSelector } from 'react-redux';
import { IAuthUserReducer } from 'Reducers/auth/auth';
import { IUserReducer } from 'Reducers/user/user';
import { IGameReducer } from 'Reducers/game/game';

export const useAuthReselect = () => {
  const authSelector = createSelector((state: IAppState) => state.auth, (auth) => auth);
  return useSelector<IAppState>((state) => authSelector(state)) as IAuthUserReducer;
};

export const useUserReselect = () => {
  const userSelector = createSelector((state: IAppState) => state.user, (user) => user);
  return useSelector<IAppState>((state) => userSelector(state)) as IUserReducer;
};

export const useGameReselect = () => {
  const gameSelector = createSelector((state: IAppState) => state.game, (game) => game);
  return useSelector((state: IAppState) => gameSelector(state)) as IGameReducer;
};
