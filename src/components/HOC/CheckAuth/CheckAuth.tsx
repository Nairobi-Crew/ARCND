import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EAuthState } from 'Reducers/auth/types';
import { getUserData } from 'Reducers/auth/actions';
import { useAuthReselect } from 'Store/hooks';

function CheckAuth<T>(Component: React.ComponentType<T>) {
  const WithAux: React.FC<T> = (props) => {
    const auth = useAuthReselect();
    const dispatch = useDispatch();

    const [authState, setAuthState] = useState(auth);

    useEffect(() => {
      setAuthState(auth);
    }, [auth]);

    useEffect(() => {
      if (authState.state === EAuthState.UNKNOWN) {
        dispatch(getUserData());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<Component {...props} />);
  };

  return WithAux;
}

export default CheckAuth;
