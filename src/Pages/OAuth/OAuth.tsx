import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthReselect, useOAuthReselect } from 'Store/hooks';
import { signInOAuthAction, signInOAUthDoneAction } from 'Reducers/oauth/actions';
import { getUserData } from 'Reducers/auth/actions';
import { EAuthState } from 'Reducers/auth/types';
import { EOAuthState } from 'Reducers/oauth/types';

const OAuth: React.FC<any> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const dispatch = useDispatch();
  const oauth = useOAuthReselect();
  const auth = useAuthReselect();

  useEffect(() => {
    if (oauth.state === EOAuthState.REDIRECT) {
      dispatch(signInOAUthDoneAction());
      dispatch(getUserData());
    }

    if (
      code && auth.state !== EAuthState.LOGGED && oauth.state !== EOAuthState.OAUTH_DONE && oauth.state !== EOAuthState.REDIRECT
    ) {
      dispatch(signInOAuthAction(code, window.location.origin));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauth]);

  return (
    <>
    </>
  );
};

export default OAuth;
