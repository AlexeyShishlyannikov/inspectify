
import React = require('react');
import { Route } from 'react-router-dom';
import Users from './Users';
import UserView from './UserView';


export const UsersRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Users} />
            <Route exact path={path + '/:id'} component={UserView} />
        </React.Fragment>
    );
};
