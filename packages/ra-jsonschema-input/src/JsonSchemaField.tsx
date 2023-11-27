import React from 'react';
import { useRecordContext, FieldProps } from 'react-admin';
import validator from '@rjsf/validator-ajv8';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { Form } from '@rjsf/mui';
import { get } from 'lodash';
import { useRJSchema } from './utils';

export const JsonSchemaField = (props: JsonSchemaFieldProps) => {
    const { schema, uiSchema = {}, label, resource, source } = props;

    const record = useRecordContext(props);
    const value = get(record, source);

    const { schema: rjsSchema, uiSchema: ruiSchema } = useRJSchema({
        resource,
        source,
        schema,
        uiSchema,
        title: label && typeof label === 'string' ? label : undefined,
    });

    return (
        <Form
            tagName={'div'}
            schema={rjsSchema}
            uiSchema={ruiSchema}
            formData={value}
            validator={validator}
            omitExtraData={true}
            showErrorList={false}
            disabled
            readonly
            noValidate
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
}

export default JsonSchemaField;
