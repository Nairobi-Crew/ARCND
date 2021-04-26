import React from 'react';
import { hydrate } from 'react-dom';
import '../common/common.scss';
import configureStore from 'Store/store';
import { initialAppState } from 'Store/types';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './App';
import renderApp from 'Server/renderApp';

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').then((registration) => {
        // eslint-disable-next-line no-console
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch((error: string) => {
        // eslint-disable-next-line no-console
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
}

startServiceWorker();

function run(store) {
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

const store = configureStore(initialAppState);

run(store);
