import { useInput, InputProps } from 'react-admin';
import validator from '@rjsf/validator-ajv8';
import React from 'react';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { Form } from '@rjsf/mui';

export const JsonSchemaInput = (props: JSONSchemaFormatInputProps) => {
    const { schema, uiSchema, onBlur, onChange } = props;

    const {
        field,
        fieldState: { isTouched, error },
        formState: { isSubmitted },
    } = useInput({
        onChange,
        onBlur,
        ...props,
    });

    const update = (data: any) => {
        field.onChange(data);
    };

    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            formData={field.value}
            validator={validator}
            onChange={(e: any) => update(e.formData)}
            omitExtraData={true}
        >
            <></>
        </Form>
    );
};

export type JSONSchemaFormatInputProps = InputProps & {
    schema: RJSFSchema;
    uiSchema: UiSchema;
};


export default JsonSchemaInput;
