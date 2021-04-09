import React, { useEffect, useState } from 'react';
import { MainProps } from 'Pages/Main/types';
import { Link } from 'react-router-dom';
import './Main.scss';
import { useDispatch } from 'react-redux';
import { EAuthState } from 'Reducers/auth/types';
import { getUserData } from 'Reducers/auth/actions';
import { useAuthReselect } from 'Store/hooks';

const Main: React.FC<MainProps> = ({ items }: MainProps) => {
  const dispatch = useDispatch();
  const auth = useAuthReselect();
  const [authState, setAuthState] = useState(auth.state === EAuthState.LOGGED);

  useEffect(() => {
    const { state } = auth;
    if (state === EAuthState.UNKNOWN) {
      dispatch(getUserData());
    } else {
      setAuthState(auth.state === EAuthState.LOGGED);
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
