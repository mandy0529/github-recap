import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Dashboard, Login, PrivateRoute, AuthWrapper, Error} from '../pages';

const Router = () => {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Switch>
          <PrivateRoute path="/" exact children={<Dashboard />} />
          <Route path="/login" component={Login} />
          <Route path="*" component={Error} />
        </Switch>
      </AuthWrapper>
    </BrowserRouter>
  );
};

export default Router;
