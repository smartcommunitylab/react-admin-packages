import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    FormContextType,
    TitleFieldProps,
    RJSFSchema,
    StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';
import { Labeled, useTranslate } from 'react-admin';

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ id, title }: TitleFieldProps<T, S, F>) {
    const translate = useTranslate();
    const label = title ? translate(title) : '';
    return (
        <Box id={id}>
            <Labeled label={label}>
                <></>
            </Labeled>
        </Box>
    );
}
