import './Property.scss';

import { Avatar, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import { IProperty } from 'client/models/inventory';
import React = require('react');

interface IPropertyProps {
    property: IProperty;
    onEditClick?: (property: IProperty) => void;
}

class Property extends React.Component<IPropertyProps> {
    editCallback = () => {
        if (this.props.onEditClick) {
            this.props.onEditClick(this.props.property);
        }
    };

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={<Avatar aria-label="index">{this.props.property.sortIndex}</Avatar>}
                    title={this.props.property.name}
                    action={
                        this.props.onEditClick && <Button color="secondary" onClick={this.editCallback} variant="text">
                            Edit <EditIcon />
                        </Button>
                    } />
                <CardContent className="property-preview-content">
                    {JSON.stringify(this.props.property)}
                </CardContent>
            </Card>
        );
    }
}

export default (Property)
