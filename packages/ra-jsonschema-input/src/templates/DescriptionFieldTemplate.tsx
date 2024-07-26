import { FormHelperText } from '@mui/material';
import {
    DescriptionFieldProps,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';
import { useTranslate } from 'react-admin';

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: DescriptionFieldProps<T, S, F>) {
    const { id, description } = props;
    const translate = useTranslate();

    if (!description) {
        return null;
    }
    if (typeof description === 'string') {
        const helperText = description ? translate(description) : '';
        return <FormHelperText id={id}> {helperText}</FormHelperText>;
    } else {
        return (
            <div id={id} className="field-description">
                {description}
            </div>
        );
    }
}
