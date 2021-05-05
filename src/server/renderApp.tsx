import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from 'Config/routes';

const renderApp = () => (
  <Switch>
    {routes.map(
      (route) => <Route {...route} />,
    )}
  </Switch>
);

export default renderApp;
