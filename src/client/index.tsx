import React from 'react';
import {hydrate} from 'react-dom';
import '../common/common.scss';
import configureStore from 'Store/store';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';
import renderApp from 'Server/renderApp';
import { Store, AnyAction } from 'redux';
import {restoreData} from './restoreData';

function run(store: Store<any, AnyAction>) {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
            {renderApp()}
          </Switch>
      </BrowserRouter>
    </Provider>,
    document?.getElementById('root'),
  );
}

const store = configureStore(restoreData());

run(store);
