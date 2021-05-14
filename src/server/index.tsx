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
  API_PATH, AUTH_PATH, FORUM_PATH, LEADER_PATH, SERVER_API_URL, USER_PATH,
} from 'Config/config';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import * as FormData from 'form-data';
import authRoutes, { getUserInfo } from 'Server/routes/auth';
import userRoutes from 'Server/routes/user';
import { EAuthState } from 'Reducers/auth/types';
import leaderRoutes from 'Server/routes/leader';
import path from 'path';
import forumRoutes from 'Server/routes/forum';
import { syncForumModels } from 'Server/db/models/forum';
// @ts-ignore
// eslint-disable-next-line import/extensions
import clientConfig from '../../webpack.client.js';
import { isDev } from '../../env.variables';

syncForumModels(false).then(() => {
  // eslint-disable-next-line no-console
  console.log('Synchronized');
// eslint-disable-next-line no-console
}).catch(() => console.log('Synchronization failed'));

(global as any).FormData = FormData;

const app = express();
app.use(cookieParser());
const json = express.json();
const PORT = process.env.PORT || 3000;
if (isDev) {
  const compiler = webpack(clientConfig as Configuration);
  app.use(
    webpackDevMiddleware(
      compiler,
      {
        serverSideRender: true,
        writeToDisk: true,
        publicPath: clientConfig.output.publicPath,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    ),
  );
  app.use(webpackHotMiddleware(compiler));
}
const distPath = path.join(__dirname, './');
app.use(express.static(distPath));

const AUTH_URL = `${API_PATH}${AUTH_PATH}`;
const AUTH_SERVER_URL = `${SERVER_API_URL}${AUTH_PATH}`;

const USER_URL = `${API_PATH}${USER_PATH}`;
const USER_SERVER_URL = `${SERVER_API_URL}${USER_PATH}`;

const LEADER_URL = `${API_PATH}${LEADER_PATH}`;
const LEADER_SERVER_URL = `${SERVER_API_URL}${LEADER_PATH}`;

const FORUM_URL = `${API_PATH}${FORUM_PATH}`;

authRoutes(app, json, AUTH_URL, AUTH_SERVER_URL);
userRoutes(app, json, USER_URL, USER_SERVER_URL);
leaderRoutes(app, json, LEADER_URL, LEADER_SERVER_URL);
forumRoutes(app, json, FORUM_URL);

app.get('*', (req: Request, res: Response) => {
  const { url, method } = req;
  // eslint-disable-next-line no-console
  console.log('Request *', { url, method });

  const context = {};
  const store = configureStore(
    initialAppState,
  );

  getUserInfo(`${AUTH_SERVER_URL}/user`, req).then((user) => {
    initialAppState.auth.state = EAuthState.LOGGED;
    initialAppState.auth.user = user;
    // eslint-disable-next-line no-console
    console.log('Authorized', user);
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
  }).catch(() => {
    initialAppState.auth.state = EAuthState.UNKNOWN;
    initialAppState.auth.user = null;
    // eslint-disable-next-line no-console
    console.log('Unauthorized');
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
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
