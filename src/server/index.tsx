import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'Store/store';
import { initialAppState } from 'Store/types';
import { Provider } from 'react-redux';
import renderApp from 'Server/renderApp';
import renderTemplate from 'Server/renderTemplate';
import { API_PATH, AUTH_PATH, SERVER_API_URL } from 'Config/config';
import Fetch, { TFetchOptions } from 'Server/fetch/Fetch';
import Cookies from 'Server/fetch/Cookies';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import FormData from 'form-data';
import clientConfig from '../../webpack.client';

(global as any).FormData = FormData;

const app = express();
app.use(cookieParser());
const json = express.json();
const PORT = process.env.PORT || 3000;

const compiler = webpack(clientConfig as Configuration);

app.use(
  webpackDev(
    compiler,
    {
      serverSideRender: true,
      writeToDisk: true,
      publicPath: clientConfig.publicPath,
    },
  ),
);
app.use(webpackHot(compiler));

app.use(express.static('dist'));
const AUTH_URL = `${API_PATH}${AUTH_PATH}`;
const SERVER_URL = `${SERVER_API_URL}${AUTH_PATH}`;

app.post(`${AUTH_URL}/signin`, json, (req, res) => {
  if (!req.body) {
    res.status(400).send({ reason: 'Error in parameters' });
    return;
  }
  const { login, password } = req.body;
  const loginOptions: TFetchOptions<{ login, password }> = {
    data: { login, password },
  };
  const serverAddress = `${SERVER_URL}/signin`;
  Fetch.post(serverAddress, loginOptions)
    .then(async (answer) => {
      Cookies.setCookies(answer, res);
      res.status(200).send(await answer.text());
    })
    .catch((error) => {
      res.status(error.status).send({ reason: error.statusText });
    });
});

app.get(`${AUTH_URL}/user`, json, (req, res) => {
  const Cookie = Cookies.getCookies(req);
  const getUserOptions: TFetchOptions<string> = {
    headers: { Cookie },
  };
  Fetch.get(`${SERVER_URL}/user`, getUserOptions)
    .then(async (answer) => {
      res.status(200).send(await answer.json());
    })
    .catch((error) => {
      res.status(error.status).send({ reason: error.statusText });
    });
});

app.post(`${AUTH_URL}/logout`, (req, res) => {
  const Cookie = Cookies.getCookies(req);

  const LogoutUserOptions: TFetchOptions<string> = {
    headers: { Cookie },
  };
  Fetch.post(`${SERVER_URL}/logout`, LogoutUserOptions)
    .then(async (answer) => {
      res.clearCookie('authCookie');
      res.clearCookie('uuid');
      res.status(200).send(await answer.text());
    })
    .catch((error) => res.status(error.status).send({ reason: error.statusText }));
});

app.get('*', async (req: Request, res: Response) => {
  const { url, method } = req;
  console.log('Request *', { url, method });
  const context = {};
  const store = configureStore(
    initialAppState,
  );

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderApp()}
      </StaticRouter>
    </Provider>,
  );

  const html = renderTemplate(
    {
      cssPath: 'main.css',
      jsPath: 'main.js',
      content,
      data: JSON.stringify(store.getState()),
    },
  );

  res.send(html);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
