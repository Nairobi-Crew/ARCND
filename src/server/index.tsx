/* eslint-disable import/no-extraneous-dependencies,import/extensions,no-console */
import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'Store/store';
import { initialAppState } from 'Store/types';
import { Provider } from 'react-redux';
import renderApp from 'Server/renderApp';
import renderTemplate from 'Server/renderTemplate';
import cookieParser from 'cookie-parser';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// @ts-ignore
import * as FormData from 'form-data';
import AuthRoute from 'Server/routes/Auth';
import UserRoute from 'Server/routes/User';
import ForumRoute from 'Server/routes/Forum';
import LeaderRoute from 'Server/routes/Leader';
import OAuthRoute from 'Server/routes/OAuth';
import { EAuthState } from 'Reducers/auth/types';
import path from 'path';
import Routes from 'Server/routes/Routes';
import * as fs from 'fs';
import { getFileByExt } from 'Server/utils';
import { isDev } from '../../env.variables';
import clientConfig from '../../webpack.client.js';

(global as any).FormData = FormData;

const app = express();
app.use(cookieParser());
app.use(express.json());

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
        // stats: 'normal',
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    ),
  );
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    log: console.log
  }));
}
// const distPath = path.join(__dirname, './');
// app.use(express.static(distPath));

const routes: Routes[] = [];

const authRoute = new AuthRoute(app);
const userRoute = new UserRoute(app);
const forumRoute = new ForumRoute(app);
const leaderRoute = new LeaderRoute(app);
const oauthRoute = new OAuthRoute(app);

routes.push(authRoute);
routes.push(userRoute);
routes.push(forumRoute);
routes.push(leaderRoute);
routes.push(oauthRoute);

app.get('*.(js|css|json|png)$', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

app.get('*', async (req: Request, res: Response) => {
  const context = {};
  const store = configureStore(
    initialAppState,
  );
  let user;
  try {
    user = await AuthRoute.getUser(req);
  } catch (e) {
    console.log('Unauthorized');
  }

  if (user) {
    initialAppState.auth.state = EAuthState.LOGGED;
    initialAppState.auth.user = user;
  } else {
    initialAppState.auth.state = EAuthState.UNKNOWN;
    initialAppState.auth.user = null;
  }

  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderApp()}
      </StaticRouter>
    </Provider>,
  );

  let css = 'main.css';
  let js = 'main.js';
  const manifestFile = path.join(__dirname, '/', 'resources-manifest.json');
  try {
    const sw = JSON.parse(fs.readFileSync(manifestFile) as unknown as string);
    js = getFileByExt(sw.TO_CACHE, '.js');
    css = getFileByExt(sw.TO_CACHE, '.css');
  } catch (e) {
    console.log(`Cannot read manifest file ${manifestFile}`);
  }

  res.send(renderTemplate(
    {
      cssPath: css,
      jsPath: js,
      content,
      data: JSON.stringify(store.getState()),
    },
  ));
});

// const server =
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // server.timeout = 100;
  // server.keepAliveTimeout = 0;
  routes.forEach((route) => console.log('Register route', route.getName()));
});
