import { ReactElement } from 'react';
import { RJSFSchema, UiSchema, GenericObjectType } from '@rjsf/utils';
import { useTranslate, useTranslateLabel } from 'react-admin';

export const parseRjsSchema = (schema: RJSFSchema | object | string) => {
    const rjsSchema: RJSFSchema =
        typeof schema === 'string'
            ? JSON.parse(schema)
            : (schema as RJSFSchema);

    return rjsSchema;
};

export const parseRuiSchema = (uiSchema: UiSchema | object | string) => {
    const ruiSchema: UiSchema =
        typeof uiSchema === 'string'
            ? JSON.parse(uiSchema)
            : (uiSchema as UiSchema);

    return ruiSchema;
};

export type UseRJSSchemaProps = {
    resource: string;
    source: string;
    schema: RJSFSchema | object | string;
    uiSchema?: UiSchema | object | string;
    title?: string | false;
    description?: string;
};

export type UseRJSSchemaReturn = {
    schema: RJSFSchema;
    uiSchema?: UiSchema;
};

export const useRJSchema = (props: UseRJSSchemaProps): UseRJSSchemaReturn => {
    const {
        resource,
        source,
        schema: inputSchema,
        uiSchema: inputUiSchema = {},
        title,
        description,
    } = props;
    const translate = useTranslate();
    const translateLabel = useTranslateLabel();

    //parse
    const schema: RJSFSchema = parseRjsSchema(inputSchema);
    const ui: GenericObjectType = parseRuiSchema(
        inputUiSchema
    ) as GenericObjectType;

    //auto-add values from translation to uiSchema if missing
    if (title && !('ui:title' in ui)) {
        ui['ui:title'] =
            typeof title === 'string'
                ? translate(title)
                : typeof title === 'boolean'
                ? translate(source)
                : '';
    }
    if (description && !('ui:description' in ui)) {
        ui['ui:description'] = translate(description);
    }

    //auto-enrich schema with titles from key when missing
    if (schema && 'properties' in schema) {
        for (const k in schema.properties) {
            const p: GenericObjectType = schema.properties[
                k
            ] as GenericObjectType;
            if (!('title' in p)) {
                p.title = k;
            }
            if (ui) {
                if (!(k in ui)) {
                    ui[k] = {};
                }

                if (!('ui:title' in ui[k])) {
                    //auto generate key and translate
                    ui[k]['ui:title'] = translateLabel({
                        source: source + '.' + k,
                        resource: resource,
                    });
                } else {
                    //translate user-provided
                    ui[k]['ui:title'] = translate(ui[k]['ui:title']);
                }
            }
        }
    }

    //convert and return
    const uiSchema: UiSchema = ui as UiSchema;

    return { schema, uiSchema };
};
