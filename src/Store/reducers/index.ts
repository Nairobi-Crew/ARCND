import { combineReducers } from 'redux';
import { authReducer } from 'Reducers/auth/auth';
import { userReducer } from 'Reducers/user/user';

export default combineReducers({ auth: authReducer, user: userReducer });
