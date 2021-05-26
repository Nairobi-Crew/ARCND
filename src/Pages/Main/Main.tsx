import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.scss';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';
import routes from 'Config/routes';
import OAuth from 'Pages/OAuth';

const Main: React.FC = () => {
  const auth = useAuthReselect();
  const [authState, setAuthState] = useState(auth.state === EAuthState.LOGGED);

  useEffect(() => {
    const { state } = auth;
    setAuthState(state === EAuthState.LOGGED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <li className="linkBlock">
      <OAuth />
      {
        routes.filter(
          (item) => {
            if (item.visibility === 'never') {
              return false;
            } if (item.visibility === 'always') {
              return true;
            } if (authState) {
              return item.visibility !== 'unauth';
            } return item.visibility !== 'auth';
          },
        ).map(
          (link) => (
            <ul key={link.path}>
              <div className="link">
                <Link to={link.path}>{link.title}</Link>
              </div>
            </ul>
          ),
        )
      }
    </li>
  );
};

export default Main;
