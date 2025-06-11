import React from 'react';
import { useRecordContext, FieldProps } from 'react-admin';
import validator from '@rjsf/validator-ajv8';
import {
    BaseInputTemplateProps,
    FormContextType,
    GenericObjectType,
    RJSFSchema,
    RegistryWidgetsType,
    StrictRJSFSchema,
    UiSchema,
} from '@rjsf/utils';
import { withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/mui';
import { get } from 'lodash';
import { useRJSchema } from './utils';
import BaseInputTemplate from '@rjsf/mui/lib/BaseInputTemplate';
import { styled } from '@mui/material';
import ArrayFieldItemTemplate from './templates/ArrayFieldItemTemplate';
import ArrayFieldTemplate from './templates/ArrayFieldTemplate';
import TitleFieldTemplate from './templates/TitleFieldTemplate';
import DescriptionFieldTemplate from './templates/DescriptionFieldTemplate';
import ObjectFieldTemplate from './templates/ObjectFieldTemplate';
import ButtonTemplates from './templates/ButtonsTemplates';
import SchemaField from './templates/SchemaField';

//build styled form
Theme.templates = {
    ...Theme.templates,
    ObjectFieldTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    TitleFieldTemplate,
    DescriptionFieldTemplate,
    ButtonTemplates,
};
Theme.fields = {
    ...Theme.fields,
    SchemaField,
};
const MuiForm = withTheme(Theme);

const PREFIX = 'RaJsonSchemaField';

const ReadOnlyForm = styled(MuiForm, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    '& .MuiFormControl-root': {
        '& .MuiGrid-root > .MuiGrid-item': {
            '& .Mui-disabled': {
                color: 'inherit',
                WebkitTextFillColor: 'inherit',
            },
            '& .MuiFormLabel-colorPrimary.Mui-disabled': {
                color:
                    theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.6)'
                        : 'rgba(255, 255, 255, 0.6)',
                marginBottom: '0.2em',
            },
        },
    },
}));

//patch base input template for custom field rendering
function ReadOnlyBaseFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
    return BaseInputTemplate({
        ...props,
        variant: 'standard',
        margin: 'dense',
        InputLabelProps: { focused: true, shrink: true },
        InputProps: {
            readOnly: true,
            disableUnderline: true,
        },
    });
}

//TODO add additional widgets for select,radio,checkbox...

export const JsonSchemaField = (props: JsonSchemaFieldProps) => {
    const {
        schema,
        uiSchema = {},
        label,
        resource,
        source,
        customWidgets,
        templates = {},
    } = props;

    const record = useRecordContext(props);
    const value = get(record, source);

    const { schema: rjsSchema, uiSchema: ruiSchema } = useRJSchema({
        resource,
        source,
        schema,
        uiSchema,
        title: label && typeof label === 'string' ? label : undefined,
    });

    const formContext = {
        resource,
        source,
    };

    //cleanup required for view-only render
    const rSchema: GenericObjectType = rjsSchema as GenericObjectType;
    if ('required' in rSchema) {
        rSchema['required'] = [];
    }
    return (
        <ReadOnlyForm
            className={PREFIX}
            tagName={'div'}
            schema={rjsSchema}
            uiSchema={ruiSchema}
            formData={value}
            formContext={formContext}
            validator={validator}
            omitExtraData={true}
            showErrorList={false}
            widgets={customWidgets}
            noValidate
            readonly
            templates={{
                BaseInputTemplate: ReadOnlyBaseFieldTemplate,
                ...templates,
            }}
        >
            <></>
        </ReadOnlyForm>
    );
};

export interface JsonSchemaFieldProps<
    RecordType extends Record<string, any> = Record<string, any>
> extends FieldProps<RecordType> {
    schema: RJSFSchema | object | string;
    uiSchema?: UiSchema | object | string;
    templates?: object;
    customWidgets?: RegistryWidgetsType;
}

export default JsonSchemaField;
