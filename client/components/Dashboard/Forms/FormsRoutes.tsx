import React = require('react');
import { Route } from 'react-router-dom';

import EditFormView from './EditFormView';
import Forms from './Forms';
import FormView from './FormView';

export const FormsRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Forms} />
            <Route exact path={path + '/create'} render={(props) => <EditFormView {...props} isEditMode={false} />} />
            <Route exact path={path + '/edit/:id'} render={(props) => <EditFormView {...props} isEditMode={true} />} />
            <Route exact path={path + '/view/:id'} component={FormView} />
        </React.Fragment>
    );
};
