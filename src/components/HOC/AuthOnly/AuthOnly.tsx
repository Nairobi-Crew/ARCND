import React, { useEffect, useState } from 'react';
import { createSelector } from 'reselect';
import { IAppState } from 'Store/types';
import { useDispatch, useSelector } from 'react-redux';
import { EUserState } from 'Reducers/auth/types';
import { getUserData } from 'Reducers/auth/actions';
import { IAuthUserReducer } from 'Reducers/auth/auth';
import { Redirect } from 'react-router-dom';

function AuthOnly<T>(Component: React.ComponentType<T>, redirectTo = '/signin') {
  const WithAux: React.FC<T> = (props): JSX.Element => {
    const authSelector = createSelector((state: IAppState) => state.auth,
      (auth) => auth);
    const auth = useSelector((state: IAppState) => authSelector(state)) as IAuthUserReducer;
    const dispatch = useDispatch();

    const [authState, setAuthState] = useState(auth);

    useEffect(() => {
      setAuthState(auth);
    }, [auth]);

    useEffect(() => {
      if (authState.state === EUserState.UNKNOWN) {
        dispatch(getUserData());
      }
    }, []);

    const { state } = authState;

    if (state === EUserState.LOGGED) {
      return (<Component {...props} />);
    } if (state === EUserState.LOGOUT || state === EUserState.LOGIN_ERROR) {
      return <Redirect to={redirectTo} />;
    }
    return (<></>);
  };

  return WithAux;
}

export default AuthOnly;
