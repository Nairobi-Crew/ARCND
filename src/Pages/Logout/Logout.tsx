import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'Store/types';
import { IAuthUserReducer } from 'Reducers/auth/auth';
import { EUserState } from 'Reducers/auth/types';
import { useHistory } from 'react-router-dom';
import { logoutUser } from 'Reducers/auth/actions';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector<IAppState>((state) => state.auth) as IAuthUserReducer;
  const history = useHistory();
  useEffect(() => {
    if (auth.state === EUserState.LOGOUT) {
      history.push('/signin');
    }
  }, [auth]);
  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return (
    <>
    </>
  );
};

export default Logout;
