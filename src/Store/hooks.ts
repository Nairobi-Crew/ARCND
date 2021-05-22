import { createSelector } from 'reselect';
import { IAppState } from 'Store/types';
import { useSelector } from 'react-redux';
import { IAuthUserReducer } from 'Reducers/auth/auth';
import { IUserReducer } from 'Reducers/user/user';
import { IGameReducer } from 'Reducers/game/game';
import { IForumReducer } from 'Reducers/forum/types';
import { ILeaderReducer } from 'Reducers/leader/leader';
import { IOAuthReducer } from 'Reducers/oauth/oauth';

export const useAuthReselect = () => {
  const authSelector = createSelector((state: IAppState) => state.auth, (auth) => auth);
  return useSelector<IAppState>((state) => authSelector(state)) as IAuthUserReducer;
};

export const useOAuthReselect = () => {
  const oauthSelector = createSelector((state: IAppState) => state.oauth, (oauth) => oauth);
  return useSelector<IAppState>((state) => oauthSelector(state)) as IOAuthReducer;
};

export const useUserReselect = () => {
  const userSelector = createSelector((state: IAppState) => state.user, (user) => user);
  return useSelector<IAppState>((state) => userSelector(state)) as IUserReducer;
};

export const useLeaderReselect = () => {
  const leaderSelector = createSelector((state: IAppState) => state.leader, (user) => user);
  return useSelector<IAppState>((state) => leaderSelector(state)) as ILeaderReducer;
};

export const useGameReselect = () => {
  const gameSelector = createSelector((state: IAppState) => state.game, (game) => game);
  return useSelector((state: IAppState) => gameSelector(state)) as IGameReducer;
};

export const useForumReselect = () => {
  const forumSelector = createSelector((state: IAppState) => state.forum, (forum) => forum);
  return useSelector((state: IAppState) => forumSelector(state)) as IForumReducer;
};

export const useForumTopics = () => {
  const forumSelector = createSelector((state: IAppState) => state.forum, (forum) => ({
    state: forum.state,
    topics: forum.topics,
  }));
  return useSelector((state: IAppState) => forumSelector(state));
};

export const useForumMessages = () => {
  const forumSelector = createSelector((state: IAppState) => state.forum, (forum) => ({
    state: forum.state,
    messages: forum.messages,
    messagesLoaded: forum.messagesLoaded,
  }));
  return useSelector((state: IAppState) => forumSelector(state));
};
