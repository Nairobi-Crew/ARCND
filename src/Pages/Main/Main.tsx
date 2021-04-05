import React, {useEffect, useState} from 'react';
import {MainProps} from 'Pages/Main/types';
import {Link} from 'react-router-dom';
import './Main.scss';
import {createSelector} from 'reselect';
import {IAppState} from 'Store/types';
import {useDispatch, useSelector} from 'react-redux';
import {IAuthUserReducer} from 'Reducers/auth/auth';
import {EUserState} from 'Reducers/auth/types';
import {getUserData} from 'Reducers/auth/actions';

const Main: React.FC<MainProps> = ({ items }: MainProps) => {
  const dispatch = useDispatch();

  const authSelector = createSelector((state: IAppState) => state.auth, (auth) => auth);
  const auth = useSelector((state: IAppState) => authSelector(state)) as IAuthUserReducer;

  const [authState, setAuthState] = useState(auth.state === EUserState.LOGGED);

  useEffect(() => {
    const { state } = auth;
    if (state === EUserState.UNKNOWN) {
      dispatch(getUserData());
    } else {
      setAuthState(auth.state === EUserState.LOGGED);
    }
  }, [auth]);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <li className="linkBlock">
      {
        items.filter((item) => !item.auth || authState === item.auth).map(
          (link) => (
            <ul key={link.href}>
              <div className="link">
                <Link to={link.href}>{link.name}</Link>
              </div>
            </ul>
          ),
        )
      }
    </li>
  );
};

export default Main;
