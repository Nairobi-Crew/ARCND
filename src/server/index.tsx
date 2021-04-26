import express, { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import configureStore from 'Store/store';
import { initialAppState } from 'Store/types';
import { Provider } from 'react-redux';
import renderApp from 'Server/renderApp';
import renderTemplate from 'Server/renderTemplate';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;
let staticPath = path.join(__dirname, 'dist');
staticPath = 'dist';
console.log('Static path:', staticPath);
app.use(express.static(staticPath));
// app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, 'dist')));

app.get('*', async (req: Request, res: Response) => {
  console.log('Accept connection', req.url);
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
      cssPath: 'style.css',
      jsPath: 'main.js',
      content,
    },
  );

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
