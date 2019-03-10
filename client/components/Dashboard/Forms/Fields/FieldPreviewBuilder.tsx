import React = require('react');

import { FieldType, IField } from '../../../../models/form';
import InputFieldPreview from './InputFieldPreview';
import MediaFieldPreview from './MediaFieldPreview';
import MultipleSelectionFieldPreview from './MultipleSelectionFieldPreview';
import SingleSelectionFieldPreview from './SingleSelectionFieldPreview';

export const FieldPreviewBuilder = (props: { field: IField }): JSX.Element => {
    switch (props.field.type) {
        case FieldType.Input:
        case FieldType.Textarea:
            return <InputFieldPreview field={props.field} />;
        case FieldType.Radio:
        case FieldType.Select:
            return <SingleSelectionFieldPreview field={props.field} />;
        case FieldType.Multiselect:
        case FieldType.Checkbox:
            return <MultipleSelectionFieldPreview field={props.field} />;
        case FieldType.Photo:
            return <MediaFieldPreview field={props.field} />;
    }
}