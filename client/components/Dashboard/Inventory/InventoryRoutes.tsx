import React = require('react');
import { Route } from 'react-router-dom';

// import EditFormView from './EditFormView';
import Inventory from './Inventory';
// import FormView from './FormView';

export const InventoryRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Inventory} />
            {/* <Route exact path={path + '/create'} render={(props) => <EditFormView {...props} isEditMode={false} />} />
            <Route exact path={path + '/edit/:id'} render={(props) => <EditFormView {...props} isEditMode={true} />} />
            <Route exact path={path + '/view/:id'} component={FormView} /> */}
        </React.Fragment>
    );
};
