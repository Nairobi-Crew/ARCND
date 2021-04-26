import React from 'react';
import 'Common/common.scss';
import App from 'App';
import ReactDOM from 'react-dom';

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

ReactDOM.render(
  <App />,
  document?.getElementById('root'),
);
