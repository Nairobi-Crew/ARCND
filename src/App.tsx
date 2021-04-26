import './common/common.scss';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'Components/ErrorBoundary/ErrorBoundary';
import configureStore from 'Store/store';
import { Provider } from 'react-redux';
import { initialAppState } from 'Store/types';
import routes from 'Config/routes';

const store = configureStore(
  initialAppState,
);

export type AppDispatch = typeof store;

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {
          routes.map(({ key, path, component }) => (
            <Route key={key} path={path}>
              {/* <ErrorBoundary> */}
              {component}
              {/* </ErrorBoundary> */}
            </Route>
          ))
        }
      </Switch>
    </BrowserRouter>
  </Provider>

);

export default App;
