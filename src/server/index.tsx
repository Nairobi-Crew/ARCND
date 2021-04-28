import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'Store/store';
import { initialAppState } from 'Store/types';
import { Provider } from 'react-redux';
import renderApp from 'Server/renderApp';
import renderTemplate from 'Server/renderTemplate';
import {
  API_PATH, AUTH_PATH, SERVER_API_URL, USER_PATH,
} from 'Config/config';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import FormData from 'form-data';
import authRoutes, { getUserInfo } from 'Server/routes/auth';
import userRoutes from 'Server/routes/user';
import { EAuthState } from 'Reducers/auth/types';
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
const AUTH_SERVER_URL = `${SERVER_API_URL}${AUTH_PATH}`;

const USER_URL = `${API_PATH}${USER_PATH}`;
const USER_SERVER_URL = `${SERVER_API_URL}${USER_PATH}`;

authRoutes(app, json, AUTH_URL, AUTH_SERVER_URL);
userRoutes(app, json, USER_URL, USER_SERVER_URL);

app.get('*', async (req: Request, res: Response) => {
  const { url, method } = req;
  // eslint-disable-next-line no-console
  console.log('Request *', { url, method });

  const context = {};
  const store = configureStore(
    initialAppState,
  );

  try {
    const user = await getUserInfo(`${AUTH_SERVER_URL}/user`, req);
    initialAppState.auth.state = EAuthState.LOGGED;
    initialAppState.auth.user = user;
  } catch (e) {
    // Not logged
  }

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderApp()}
      </StaticRouter>
    </Provider>,
  );

  res.send(renderTemplate(
    {
      cssPath: 'main.css',
      jsPath: 'main.js',
      content,
      data: JSON.stringify(store.getState()),
    },
  ));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
