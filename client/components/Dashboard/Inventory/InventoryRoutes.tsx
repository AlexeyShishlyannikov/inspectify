import React = require('react');
import { Route } from 'react-router-dom';

// import EditFormView from './EditFormView';
import Inventory from './Inventory';
import TemplateForm from './Templates/TemplateForm';
import TemplateView from './Templates/TemplateView';
// import FormView from './FormView';

export const InventoryRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Inventory} />
            <Route exact path={path + '/templates/create'} render={(props) => <TemplateForm {...props} isEditMode={false} />} />
            <Route exact path={path + '/templates/edit/:id'} render={(props) => <TemplateForm {...props} isEditMode={true} />} />
            <Route exact path={path + '/templates/view/:id'} component={TemplateView} />
        </React.Fragment>
    );
};
