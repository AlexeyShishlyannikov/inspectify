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
        <UnauthenenticatedRoute store={store} exact path="/login" component={Login} />
        <UnauthenenticatedRoute store={store} exact path="/register" component={Register} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
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
                : <Redirect to='/' />
        )} />
    );
}