import React from 'react';
import { Route } from 'react-router-dom';
import routes from 'Config/routes';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';

const App = () => (
  <>
    {
    routes.map((route) => (
      <Route key={route.key} path={route.path} exact={route.exact}>
        {/*<ErrorBoundary key={route.key}>*/}
          {route.component}
        {/*</ErrorBoundary>*/}
      </Route>
    ))
  }
  </>
);

export default App;
