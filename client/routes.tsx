import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Store } from 'redux';

import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import RegisterCompany from './components/Authentication/RegisterCompany';
import RegisterUser from './components/Authentication/RegisterUser';
import ResetPassword from './components/Authentication/ResetPassword';
import { DashboardRoutes } from './components/Dashboard/DashboardRoutes';
import Home from './components/Home';
import { Layout } from './components/Layout';
import { ApplicationState } from './store';

export const routes = (store: Store<ApplicationState>) => (
    <Layout>
        <Route exact path="/" component={Home} />
        <UnauthenenticatedRoute store={store} exact path="/login" component={Login} />
        <UnauthenenticatedRoute store={store} exact path="/registerCompany" component={RegisterCompany} />
        <UnauthenenticatedRoute store={store} exact path="/registerUser" component={RegisterUser} />
        <UnauthenenticatedRoute store={store} exact path="/forgotPassword" component={ForgotPassword} />
        <PrivateRoute store={store} exact path="/resetPassword" component={ResetPassword} />
        <PrivateRoute store={store} path="/dashboard" component={() => DashboardRoutes('/dashboard')} />
    </Layout>
);

export const PrivateRoute = ({ component: Component, store, ...rest }): JSX.Element => {
    const storeRef = store as Store<ApplicationState>;
    return (
        <Route {...rest} render={(props) => (
            storeRef.getState().authentication.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    );
}

export const UnauthenenticatedRoute = ({ component: Component, store, ...rest }): JSX.Element => {
    const storeRef = store as Store<ApplicationState>;
    return (
        <Route {...rest} render={(props) => (
            !storeRef.getState().authentication.isAuthenticated
                ? <Component {...props} />
                : <Redirect to='/dashboard/home' />
        )} />
    );
}