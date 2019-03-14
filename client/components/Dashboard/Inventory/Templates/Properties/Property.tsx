import './Property.scss';

import { Avatar, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import { IProperty, getPropertyTypeString } from '../../../../../models/inventory';
import React = require('react');

interface IPropertyProps {
    property: IProperty;
    sortIndex?: number;
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
                    avatar={<Avatar aria-label="index">{this.props.sortIndex ? this.props.sortIndex : this.props.property.sortIndex}</Avatar>}
                    title={this.props.property.name}
                    subheader={getPropertyTypeString(this.props.property.type)}
                    action={
                        this.props.onEditClick && <Button color="secondary" onClick={this.editCallback} variant="text">
                            Edit <EditIcon />
                        </Button>
                    } />
            </Card>
        );
    }
}

export default (Property)
