import { useRef, useEffect } from 'react';
import { InputProps, useInput, useResourceContext, useTranslate } from 'react-admin';
import Form, { IChangeEvent } from '@rjsf/core';
import {
    CustomValidator,
    RegistryFieldsType,
    RegistryWidgetsType,
    RJSFSchema,
    RJSFValidationError,
    UiSchema,
} from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';
import Ajv2020 from 'ajv/dist/2020';
import { withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/mui';
import { styled } from '@mui/system';
import TitleFieldTemplate from './templates/TitleFieldTemplate'; // il tuo template custom
import React from 'react';
import {
    ObjectFieldTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    DescriptionFieldTemplate,
    SchemaField,
} from './templates';
import { useRJSchema } from './utils';

//build styled form
Theme.templates = {
    ...Theme.templates,
    ObjectFieldTemplate,
    ArrayFieldTemplate,
    ArrayFieldItemTemplate,
    TitleFieldTemplate,
    DescriptionFieldTemplate,
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
    const translate = useTranslate(); 
    const errors = useRef<any[]>(new Array());
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
    const schemaRef = useRef(rjsSchema);
    useEffect(() => {
        schemaRef.current = rjsSchema;
    }, [rjsSchema]);
    const translateErrorString = (str?: string) => {
        if (!str) return str;
        return str.replace(/'([^']+)'/g, (match, key) => {
            return `'${translate(key, { _: key })}'`;
        });
    };
    const validate = (value: any) => {
        if (schemaRef.current) {
            const result = validator.validateFormData(
                value ?? {},
                schemaRef.current
            );
            if (result && result.errors && result.errors.length > 0) {
                const errorMsg = result.errors[0].message || result.errors[0].stack;
                return translateErrorString(errorMsg);
            }
        }

        if (errors.current && errors.current.length > 0) {
            return errors.current
                .map((e: any) => {
                    const msg = typeof e === 'string' ? e : e.stack || e.message;
                    return translateErrorString(msg);
                })
                .join('\n');
        }

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
    const transformErrors = (errors: RJSFValidationError[]) => {
        return errors.map(error => {
            if (error.message) {
                error.message = translateErrorString(error.message) as string;
            }
            if (error.stack) {
                error.stack = translateErrorString(error.stack) as string;
            }
            return error;
        });
    };


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
            transformErrors={transformErrors}
            omitExtraData={true}
            liveValidate={invalid || isTouched}
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
