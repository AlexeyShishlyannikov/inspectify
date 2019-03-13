import React = require('react');
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import DashboardHome from './DashboardHome';
import Profile from './Profile';
import { TeamRoutes } from './Teams/TeamRoutes';

import { UsersRoutes } from './Users/UsersRoutes';
import { FormsRoutes } from './Forms/FormsRoutes';
import { InventoryRoutes } from './Inventory/InventoryRoutes';

export const DashboardRoutes = (path: string) => {
    return (
        <Dashboard path={path}>
            <Route exact path={path} component={DashboardHome} />
            <Route exact path={path + '/profile'} component={Profile} />
            <Route path={path + '/users'} component={() => UsersRoutes(path + '/users')} />
            <Route path={path + '/teams'} component={() => TeamRoutes(path + '/teams')} />
            <Route path={path + '/forms'} component={() => FormsRoutes(path + '/forms')} />
            <Route path={path + '/inventory'} component={() => InventoryRoutes(path + '/inventory')} />
        </Dashboard>
    );
};
