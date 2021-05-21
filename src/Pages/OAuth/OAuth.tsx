import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useOAuthReselect } from 'Store/hooks';
import { clearRedirectState, signInOAuthAction } from 'Reducers/oauth/actions';
import { EOAuthState } from 'Reducers/oauth/types';
import { getUserData } from 'Reducers/auth/actions';

const OAuth: React.FC<any> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const history = useHistory();
  const dispatch = useDispatch();
  const oauth = useOAuthReselect();

  if (!code) {
    // history.push('/');
  }

  useEffect(() => {
    if (oauth.state === EOAuthState.REDIRECT) {
      dispatch(getUserData());
      dispatch(clearRedirectState());
      history.push('/');
    }
    if (code) {
      dispatch(signInOAuthAction(code, 'http://localhost:3000'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oauth]);

  useEffect(() => {
    dispatch(getUserData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <></>
  );
};

export default OAuth;
