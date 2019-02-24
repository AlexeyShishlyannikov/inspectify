import React = require('react');
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import { DashboardHome } from './DashboardHome';

export const DashboardRoutes = (path: string) => {
    return (
        <Dashboard path={path}>
            <Route exact path={path} component={DashboardHome} />
        </Dashboard>
    );
};
