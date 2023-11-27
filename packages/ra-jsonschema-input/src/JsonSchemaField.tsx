import React from 'react';
import { useRecordContext, FieldProps } from 'react-admin';
import validator from '@rjsf/validator-ajv8';
import {
    BaseInputTemplateProps,
    FormContextType,
    GenericObjectType,
    RJSFSchema,
    StrictRJSFSchema,
    UiSchema,
} from '@rjsf/utils';
import { Form } from '@rjsf/mui';
import { get } from 'lodash';
import { useRJSchema } from './utils';
import BaseInputTemplate from '@rjsf/mui/lib/BaseInputTemplate';

//TODO add css or update template
// .RaJsonSchemaField-Form .MuiGrid-root > .MuiGrid-item {
//     padding-top: 0;
//     margin-bottom: 0 !important;
// }

//patch base template for custom field rendering
function ReadOnlyBaseFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
    return BaseInputTemplate({
        ...props,
        variant: 'standard',
        InputProps: {
            readOnly: true,
            disableUnderline: true,
        },
    });
}

export const JsonSchemaField = (props: JsonSchemaFieldProps) => {
    const {
        schema,
        uiSchema = {},
        label,
        resource,
        source,
        forceReadOnly = false,
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

    //cleanup required for view-only render
    const rSchema: GenericObjectType = rjsSchema as GenericObjectType;
    if ('required' in rSchema) {
        rSchema['required'] = [];
    }

    return (
        <Form
            tagName={'div'}
            schema={rjsSchema}
            uiSchema={ruiSchema}
            formData={value}
            validator={validator}
            omitExtraData={true}
            showErrorList={false}
            noValidate
            readonly={forceReadOnly}
            templates={{ BaseInputTemplate: ReadOnlyBaseFieldTemplate }}
            className="RaJsonSchemaField-Form"
        >
            <></>
        </Form>
    );
};

export interface JsonSchemaFieldProps<
    RecordType extends Record<string, any> = Record<string, any>
> extends FieldProps<RecordType> {
    schema: RJSFSchema | object | string;
    uiSchema?: UiSchema | object | string;
    forceReadOnly?: boolean;
}

export default JsonSchemaField;
