import React from 'react';
import {init} from '../common/common'
import { hydrate } from 'react-dom';
import '../common/common.scss';
import configureStore from 'Store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import renderApp from 'Server/renderApp';
import { hot } from 'react-hot-loader/root';
import rootReducer from 'Store/reducers/index';
import { restoreData } from './restoreData';
import { isDev } from '../../env.variables';

const store = configureStore(restoreData());

const Root = () => {
  init()
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {renderApp()}
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

const HotRoot = hot(Root);

hydrate(
  isDev ? (<HotRoot />) : (<Root />),
  document?.getElementById('root'),
);

if (isDev) {
  if ((module as any).hot) {
    (module as any).hot.accept('../Store/store', () => {
      store.replaceReducer(rootReducer);
    });
    (module as any).hot.accept();
  }
}
