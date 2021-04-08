import { combineReducers } from 'redux';
import { authReducer } from 'Reducers/auth/auth';
import { userReducer } from 'Reducers/user/user';
import { gameReducer } from 'Reducers/game/game';

export default combineReducers({ auth: authReducer, user: userReducer, game: gameReducer });
