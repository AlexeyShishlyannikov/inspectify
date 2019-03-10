import './SingleSelectionFieldPreview.scss';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React = require('react');

import { IField, FieldType } from '../../../../models/form';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

interface ISingleSelectionFieldPreviewProps {
    field: IField;
}

interface ISingleSelectionFieldPreviewState {
    selectedValue: string;
}

class SingleSelectionFieldPreview extends React.Component<ISingleSelectionFieldPreviewProps, ISingleSelectionFieldPreviewState> {
    state: ISingleSelectionFieldPreviewState = {
        selectedValue: this.props.field.options[0].id ? this.props.field.options[0].id : ''
    }

    handleChange = (prop: string) => (
        event: React.ChangeEvent<{}>,
        value: string
    ): void => {
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    handleSelectChange = (prop: string) => (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const value = event.target.value;
        this.setState(state => ({
            ...state,
            [prop]: value
        }));
    };

    render() {
        return (
            <React.Fragment>
                {this.props.field.type === FieldType.Radio &&
                    <FormControl className="input-field-preview">
                        <FormLabel htmlFor="name">{this.props.field.name}</FormLabel>
                        <RadioGroup
                            aria-label={this.props.field.name}
                            name={this.props.field.name}
                            value={this.state.selectedValue}
                            onChange={this.handleChange('selectedValue')}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            {this.props.field.options.map(option =>
                                <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.value} />
                            )}
                        </RadioGroup>
                        <FormHelperText>{this.props.field.description}</FormHelperText>
                    </FormControl>}
                {this.props.field.type === FieldType.Select &&
                    <FormControl className="input-field-preview">
                        <InputLabel htmlFor="name">{this.props.field.name}</InputLabel>
                        <Select
                            native
                            value={this.state.selectedValue}
                            onChange={this.handleSelectChange('selectedValue')}
                        >
                            <option value="" />
                            {this.props.field.options.map(option =>
                                <option key={option.id} value={option.id}>{option.value}</option>)}
                        </Select>
                        <FormHelperText>{this.props.field.description}</FormHelperText>
                    </FormControl>}
            </React.Fragment>
        );
    }
}

export default (SingleSelectionFieldPreview)
