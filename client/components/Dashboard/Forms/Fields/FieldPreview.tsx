import './FieldPreview.scss';

import { Avatar, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EditIcon from '@material-ui/icons/Edit';
import React = require('react');

import { FieldType, FormUtil, IField } from '../../../../models/form';
import { FieldPreviewBuilder } from './FieldPreviewBuilder';

interface IFieldPreviewProps {
    field: IField;
    onEditClick?: (field: IField) => void;
}

class FieldPreview extends React.Component<IFieldPreviewProps> {
    componentWillMount() {
        this.setState({
            name: this.props.field ? this.props.field.name : '',
            description: this.props.field && this.props.field.description ? this.props.field.description : '',
            isRequired: this.props.field && this.props.field.isRequired ? this.props.field.isRequired : false,
            type: this.props.field && this.props.field.type ? this.props.field.type : FieldType.Input,
            sortIndex: this.props.field && this.props.field.sortIndex ? this.props.field.sortIndex : 0,
            options: this.props.field && this.props.field.options ? this.props.field.options : []
        });
    }

    editCallback = () => {
        if (this.props.onEditClick) {
            this.props.onEditClick(this.props.field);
        }
    };

    

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={<Avatar aria-label="index">{this.props.field.sortIndex}</Avatar>}
                    title={this.props.field.name}
                    subheader={FormUtil.getInputString(this.props.field.type)}
                    action={
                        this.props.onEditClick && <Button color="secondary" onClick={this.editCallback} variant="text">
                            Edit <EditIcon />
                        </Button>
                    } />
                <CardContent className="field-preview-content">
                    <FieldPreviewBuilder field={this.props.field} />
                </CardContent>
            </Card>
        );
    }
}

export default (FieldPreview)
