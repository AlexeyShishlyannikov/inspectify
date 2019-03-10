import './FieldOptionsForm.scss';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import React = require('react');

import { IOption } from '../../../../models/form';

interface IFieldOptionsFormProps {
    options: IOption[];
    onChange: (options: IOption[]) => void;
}

interface IFieldOptionsFormState {
    optionValue: string;
    selectedOption?: IOption;
    options: IOption[];
    isEditing: boolean;
}

class FieldOptionsForm extends React.Component<IFieldOptionsFormProps, IFieldOptionsFormState> {
    state: IFieldOptionsFormState = {
        optionValue: '',
        selectedOption: undefined,
        options: this.props.options,
        isEditing: false
    }

    handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    saveOption = () => {
        if (this.state.isEditing) {
            this.setState({
                options: this.state.options
                    .map(o => o === this.state.selectedOption ? { ...this.state.selectedOption, value: this.state.optionValue } : o),
                optionValue: '',
                selectedOption: undefined,
                isEditing: false
            }, () => this.props.onChange(this.state.options));
        } else {
            this.setState({
                options: this.state.options.concat({ id: undefined, value: this.state.optionValue }),
                optionValue: '',
                selectedOption: undefined,
                isEditing: false
            }, () => this.props.onChange(this.state.options));
        }
    }

    deleteOption = (option: IOption) => {
        this.setState({
            options: this.state.options.filter(o => o !== option)
        });
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControl margin='dense' className="input-field-preview">
                        <InputLabel htmlFor="optiopns">Option</InputLabel>
                        <Input
                            type="text"
                            value={this.state.optionValue}
                            onChange={this.handleChange('optionValue')}
                        />
                    </FormControl>
                    <Button onClick={() => this.saveOption()} variant="text">{this.state.isEditing ? 'Save' : 'Add'}</Button>
                </div>
                <div className="field-options-preview">
                    {this.state.options.map(option =>
                        <Chip
                            key={option.id}
                            color={this.state.selectedOption === option ? 'primary' : 'default'}
                            label={option.value}
                            onClick={() => this.setState({ selectedOption: option, optionValue: option.value, isEditing: true })}
                            onDelete={() => this.deleteOption(option)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default (FieldOptionsForm)
