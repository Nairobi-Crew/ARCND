import { combineReducers } from 'redux';
import { authReducer } from 'Reducers/auth/auth';
import { userReducer } from 'Reducers/user/user';
import { gameReducer } from 'Reducers/game/game';
import { forumReducer } from 'Reducers/forum/forum';
import { leaderReducer } from 'Reducers/leader/leader';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  game: gameReducer,
  forum: forumReducer,
  leader: leaderReducer,

});
