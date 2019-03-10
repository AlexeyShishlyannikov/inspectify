import './MediaFieldPreview.scss';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React = require('react');

import { IField } from '../../../../models/form';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IMediaFieldPreviewProps {
    field: IField;
}

interface IMediaFieldPreviewState {
    inputValue: string;
}

class MediaFieldPreview extends React.Component<IMediaFieldPreviewProps, IMediaFieldPreviewState> {
    state: IMediaFieldPreviewState = {
        inputValue: ''
    }

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    render() {
        return (
            <FormControl className="input-field-preview">
                <InputLabel htmlFor="name">{this.props.field.name}</InputLabel>
                <Input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleChange('inputValue')}
                />
                <FormHelperText>{this.props.field.description}</FormHelperText>
            </FormControl>
        );
    }
}

export default (MediaFieldPreview)
