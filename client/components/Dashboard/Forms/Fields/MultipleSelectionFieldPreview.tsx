import './MultipleSelectionFieldPreview.scss';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React = require('react');

import { FieldType, IField, IOption } from '../../../../models/form';

interface IMultipleSelectionFieldPreviewProps {
    field: IField;
}

interface IMultipleSelectionFieldPreviewState {
    selectedValues: IOption[];
}

class MultipleSelectionFieldPreview extends React.Component<IMultipleSelectionFieldPreviewProps, IMultipleSelectionFieldPreviewState> {
    state: IMultipleSelectionFieldPreviewState = {
        selectedValues: []
    }

    handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const value = event.target.value as unknown as string[];
        const options = this.props.field.options.filter(o => !!value.find(v => v === o.id));
        this.setState({
            selectedValues: options
        });
    };

    handleCheckboxChange = (option: IOption) => {
        const isSelected = !!this.state.selectedValues.find(v => v === option);
        this.setState({
            selectedValues: isSelected ? this.state.selectedValues.filter(v => v !== option) : this.state.selectedValues.concat(option)
        })
    }

    getMultiselectTemplate = () => {
        return <FormControl className="input-field-preview">
            <InputLabel htmlFor="multiselect">{this.props.field.name}</InputLabel>
            <Select
                multiple
                value={this.state.selectedValues.map(v => v.id) as string[]}
                onChange={this.handleSelectChange}
                input={<Input />}
                renderValue={() => (
                    <React.Fragment>
                        {this.state.selectedValues.map(value => <Chip key={value.id} label={value.value} />)}
                    </React.Fragment>
                )}
            >
                {this.props.field.options.map(option => <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>)}
            </Select>
            <FormHelperText>{this.props.field.description}</FormHelperText>
        </FormControl>
    }

    getCheckboxTemplate = () => {
        return <FormControl className="input-field-preview">
            <FormLabel htmlFor="name">{this.props.field.name}</FormLabel>
            <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
                {this.props.field.options.map(option =>
                    <FormControlLabel
                        key={option.id}
                        control={
                            <Checkbox
                                value={option.id}
                                onChange={() => this.handleCheckboxChange(option)}
                                checked={!!this.state.selectedValues.find(v => v === option)}
                            />}
                        label={option.value} />
                )}
            </FormGroup>
            <FormHelperText>{this.props.field.description}</FormHelperText>
        </FormControl>
    }

    render() {
        return (
            <React.Fragment>
                {this.props.field.type === FieldType.Checkbox && this.getCheckboxTemplate()}
                {this.props.field.type === FieldType.Multiselect && this.getMultiselectTemplate()}
            </React.Fragment>
        );
    }
}

export default (MultipleSelectionFieldPreview)
