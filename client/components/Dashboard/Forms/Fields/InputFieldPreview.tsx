import './InputFieldPreview.scss';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React = require('react');

import { IField, FieldType } from '../../../../models/form';
import FormHelperText from '@material-ui/core/FormHelperText';

interface IInputFieldPreviewProps {
    field: IField;
}

interface IInputFieldPreviewState {
    inputValue: string;
}

class InputFieldPreview extends React.Component<IInputFieldPreviewProps, IInputFieldPreviewState> {
    state: IInputFieldPreviewState = {
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

    getRowsCount = (): number => {
        if (this.props.field.type === FieldType.Input) {
            return 1;
        }
        else {
            return 4;
        }
    }

    render() {
        return (
            <FormControl className="input-field-preview">
                <InputLabel htmlFor="name">{this.props.field.name}</InputLabel>
                <Input
                    type="text"
                    required={this.props.field.isRequired}
                    multiline={this.props.field.type === FieldType.Textarea}
                    rowsMax={this.getRowsCount()}
                    value={this.state.inputValue}
                    onChange={this.handleChange('inputValue')}
                />
                <FormHelperText>{this.props.field.description}</FormHelperText>
            </FormControl>
        );
    }
}

export default (InputFieldPreview)
