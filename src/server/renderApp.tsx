import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from 'Config/routes';
import Layout from "UI/Layout";

const renderApp = () => {
  return (
    <Layout>
      <Switch>
        {routes.map(
          (route) => <Route showLayout={route.showLayout ?? true} {...route} />,
        )}
      </Switch>
    </Layout>
  )
};

export default renderApp;

