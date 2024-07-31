import React, { useRef } from 'react';
import { InputProps, useInput, useResourceContext } from 'react-admin';
import {
    CustomValidator,
    RJSFSchema,
    RJSFValidationError,
    RegistryFieldsType,
    RegistryWidgetsType,
    UiSchema,
} from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';
import Ajv2020 from 'ajv/dist/2020';

import Form from '@rjsf/core';
import { useRJSchema } from './utils';
import { withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/mui';
import ArrayFieldItemTemplate from './templates/ArrayFieldItemTemplate';
import ArrayFieldTemplate from './templates/ArrayFieldTemplate';
import TitleFieldTemplate from './templates/TitleFieldTemplate';
import { styled } from '@mui/material';
import ObjectFieldTemplate from './templates/ObjectFieldTemplate';
import DescriptionFieldTemplate from './templates/DescriptionFieldTemplate';
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
const validator = customizeValidator({ AjvClass: Ajv2020 });

const PREFIX = 'RaJsonSchemaInput';

const StyledForm = styled(MuiForm, {
    name: PREFIX,
    overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
    // [`& .MuiGrid-root`]: {
    //     [`& >.MuiGrid-item`]: {
    //         paddingTop: 0,
    //     },
    // },
    // // fix objectTemplate wrong margin
    // //DISABLED, we override the template for custom layouts
    // [`& .field-object`]: {
    //     [`& >.MuiFormControl-root`]: {
    //         [`& >.MuiGrid-root.MuiGrid-container`]: {
    //             marginTop: '-16px !important',
    //         },
    //     },
    // },
}));

export const JsonSchemaInput = (props: JSONSchemaFormatInputProps) => {
    const {
        schema,
        uiSchema = {},
        label,
        helperText,
        source,
        customWidgets,
        customValidate,
        templates,
        fields,
        noHtml5Validate = false,
    } = props;

    const resource = useResourceContext(props);
    const errors = useRef<any[]>(new Array());

    const validate = (value: any) => {
        if (errors && errors.current.length > 0) {
            //expose first error
            const e: any = errors.current.find(i => true);
            return typeof e === 'string' ? e : e.stack;
        }

        //no errors
        return undefined;
    };

    const {
        field,
        fieldState: { error, invalid, isTouched },
        formState: { isLoading, isSubmitted },
    } = useInput({
        defaultValue: {},
        resource,
        source,
        validate,
    });
    const data = field.value;
    const onChange = (e: any, id?: string) => {
        if (isLoading != undefined && !isLoading && id) {
            //validate first
            if (formRef.current) {
                const isValid = formRef?.current?.validateForm();
                if (isValid) {
                    //clear errors
                    errors.current = new Array();
                }
            }

            //update data
            if (e.formData) {
                field.onChange(e.formData);
            }
        }
    };

    const onError = (values: RJSFValidationError[]) => {
        //always reset errors
        errors.current = new Array();
        if (values && values.length > 0) {
            //push errors to be consumed by validator
            values.forEach(e => errors.current.push(e));
        }
    };

    const { schema: rjsSchema, uiSchema: ruiSchema } = useRJSchema({
        resource,
        source,
        schema,
        uiSchema,
        title: label && typeof label === 'string' ? label : undefined,
        description:
            helperText && typeof helperText === 'string'
                ? helperText
                : undefined,
    });

    const formContext = {
        resource,
        source,
    };

    const formRef = useRef<Form>();

    return (
        <StyledForm
            ref={formRef}
            className={PREFIX}
            tagName={'div'}
            schema={rjsSchema}
            uiSchema={ruiSchema}
            templates={templates}
            fields={fields}
            formData={data}
            formContext={formContext}
            validator={validator}
            onChange={onChange}
            onError={onError}
            omitExtraData={true}
            liveValidate={false}
            showErrorList={false}
            widgets={customWidgets}
            customValidate={customValidate}
            noHtml5Validate={noHtml5Validate}
        >
            <></>
        </StyledForm>
    );
};

export type JSONSchemaFormatInputProps = Omit<InputProps, 'validate'> & {
    schema: RJSFSchema | object | string;
    uiSchema?: UiSchema | object | string;
    templates?: object;
    fields?: RegistryFieldsType;
    customWidgets?: RegistryWidgetsType;
    customValidate?: CustomValidator;
    noHtml5Validate?: boolean;
};

export default JsonSchemaInput;
