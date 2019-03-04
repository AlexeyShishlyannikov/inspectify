import React = require('react');
import { Route } from 'react-router-dom';

import Teams from './Teams';
import TeamView from './TeamView';

export const TeamRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Teams} />
            <Route exact path={path + '/:id'} component={TeamView} />
            <Route exact path={path + 'edit/:id'} component={TeamView} />
        </React.Fragment>
    );
};
