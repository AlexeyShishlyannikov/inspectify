import React = require('react');
import { Route } from 'react-router-dom';

import Inventory from './Inventory';
import ItemForm from './Items/ItemForm';
import ItemView from './Items/ItemView';
import TemplateForm from './Templates/TemplateForm';
import TemplateView from './Templates/TemplateView';

export const InventoryRoutes = (path: string) => {
    return (
        <React.Fragment>
            <Route exact path={path} component={Inventory} />
            <Route exact path={path + '/templates/create'} render={(props) => <TemplateForm {...props} isEditMode={false} />} />
            <Route exact path={path + '/templates/edit/:id'} render={(props) => <TemplateForm {...props} isEditMode={true} />} />
            <Route exact path={path + '/templates/view/:id'} component={TemplateView} />
            <Route exact path={path + '/items/create'} render={(props) => <ItemForm {...props} isEditMode={false} />} />
            <Route exact path={path + '/items/edit/:id'} render={(props) => <ItemForm {...props} isEditMode={true} />} />
            <Route exact path={path + '/items/view/:id'} component={ItemView} />
        </React.Fragment>
    );
};
