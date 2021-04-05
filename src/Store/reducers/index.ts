import { combineReducers } from 'redux';
import { authReducer } from 'Reducers/auth/auth';

export default combineReducers({ auth: authReducer });
