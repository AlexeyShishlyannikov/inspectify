import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register';
import ForgotPassword from './components/Authorization/ForgotPassword';
import ResetPassword from './components/Authorization/ResetPassword';

export const routes = (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/forgotPassword" component={ForgotPassword} />
    <Route exact path="/resetPassword" component={ResetPassword} />
  </Layout>
);
