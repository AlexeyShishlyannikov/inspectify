import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import ResetPassword from './components/Authentication/ResetPassword';
import Home from './components/Home';
import { Layout } from './components/Layout';
import { Store } from 'redux';
import { ApplicationState } from './store';

export const routes = (store: Store<ApplicationState>) => (
    <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
    </Layout>
);

export const PrivateRoute = (store: Store<ApplicationState>, { component: Component, ...rest }): JSX.Element => {
    return (
        <Route {...rest} render={(props) => (
            store.getState().authentication.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    );
}