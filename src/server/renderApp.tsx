import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from 'Config/routes';
import {useThemeReselect} from "Store/hooks";

const renderApp = () => {
  const themeReselect = useThemeReselect()
  const [theme,setTheme] = useState(true)
  useEffect(()=> {
    console.log(themeReselect)
    // setTheme(themeReselect)
  },[themeReselect])

  return (
    <div className={`root`}>
      <Switch>
        {routes.map(
          (route) => <Route {...route} />,
        )}
      </Switch>
    </div>
  )
};

export default renderApp;
