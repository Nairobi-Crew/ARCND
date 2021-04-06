import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './common/common.scss';

ReactDOM.render(
  <App />,
  document?.getElementById('root'),
);

function startServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then(registration => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        }).catch((error: string) => {
          console.log("ServiceWorker registration failed: ", error);
        });
    });
  }
}

startServiceWorker();
