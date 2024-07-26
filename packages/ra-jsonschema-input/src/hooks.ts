import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { useMemo } from 'react';
import { useTranslate } from 'react-admin';
import { get, set } from 'lodash';

/**
 * Translatables collection via deepScan
 */

export const useJsonSchemaTranslatable = () => {
    const translate = useTranslate();

    const deepTranslatables = (
        obj: object,
        path: string[],
        translations: string[]
    ) => {
        for (const e in obj) {
            //translate titles and descriptions
            if (
                (e === 'ui:title' ||
                    e === 'ui:description' ||
                    e === 'title' ||
                    e === 'description') &&
                typeof obj[e] === 'string'
            ) {
                translations.push([...path, e].join('.'));
            } else if (obj[e] instanceof Object) {
                //recursive on objects
                translations = deepTranslatables(
                    obj[e],
                    [...path, e],
                    translations
                );
            }
        }

        return translations;
    };

    const translatables = (
        schema: string | object | UiSchema | RJSFSchema | undefined
    ) => {
        //collect all translatable strings
        const translations: string[] = [];

        if (schema && schema instanceof Object) {
            for (const e in schema) {
                if (
                    (e === 'ui:title' ||
                        e === 'ui:description' ||
                        e === 'title' ||
                        e === 'description') &&
                    typeof schema[e] === 'string'
                ) {
                    translations.push(e);
                } else if (
                    (e === 'properties' || e === '$defs') &&
                    schema[e] instanceof Object
                ) {
                    translations.push(...deepTranslatables(schema[e], [e], []));
                }
            }
        }
        return translations;
    };

    const translator = (
        schemaProp: string | object | UiSchema | RJSFSchema,
        uiSchemaProp?: string | object | UiSchema | RJSFSchema | undefined,
        schemaTranslations: string[] = [],
        uiTranslations: string[] = []
    ) => {
        const schema = JSON.parse(JSON.stringify(schemaProp || {}));
        schemaTranslations.forEach(e => {
            const t = get(schema, e);
            if (t) {
                set(schema, e, translate(t));
            }
        });

        //avoid modification on uiSchema
        //DISABLED, breaks with template/widget refs which are not serializable
        // const uiSchema = JSON.parse(JSON.stringify(uiSchemaProp));
        const uiSchema = uiSchemaProp;
        if (typeof uiSchema === 'object') {
            uiTranslations.forEach(e => {
                const t = get(uiSchema, e);
                if (t) {
                    set(uiSchema, e, translate(t));
                }
            });

            //make sure all top-level props have ui:** defined
            for (const e in schema.properties) {
                if (!(e in uiSchema)) {
                    uiSchema[e] = {};
                }
                if (
                    schema.properties[e]['title'] &&
                    !('ui:title' in uiSchema[e])
                ) {
                    uiSchema[e]['ui:title'] = schema.properties[e]['title'];
                }
                if (
                    schema.properties[e]['description'] &&
                    !('ui:description' in uiSchema[e])
                ) {
                    uiSchema[e]['ui:description'] =
                        schema.properties[e]['description'];
                }
            }
        }

        return { schema, uiSchema };
    };

    return {
        translator,
        translatables,
    };
};

export const useJsonSchemaTranslator = (
    schemaProp: string | object | UiSchema | RJSFSchema,
    uiSchemaProp?: string | object | UiSchema | RJSFSchema | undefined
) => {
    const { translator, translatables } = useJsonSchemaTranslatable();

    const [schemaTranslations, uiTranslations] = useMemo(
        () => [translatables(schemaProp), translatables(uiSchemaProp)],
        [JSON.stringify(schemaProp || {}), JSON.stringify(uiSchemaProp || {})]
    );

    return translator(
        schemaProp,
        uiSchemaProp,
        schemaTranslations,
        uiTranslations
    );
};

/**
 * Deep translator
 * DISABLED
 */
export const useJsonSchemaDeepTranslator = () => {
    const translate = useTranslate();

    const translator = (
        schema: string | object | UiSchema | RJSFSchema | undefined
    ) => {
        if (schema && schema instanceof Object) {
            const u = {};
            for (const e in schema as Object) {
                if (schema[e] instanceof Object) {
                    u[e] = deepTranslate(schema[e], [e]);
                } else {
                    u[e] = schema[e];
                }
            }

            return u;
        }

        return schema ?? {};
    };

    const deepTranslate = (obj: object, path: string[]) => {
        for (const e in obj) {
            //translate titles and descriptions
            if (
                (e === 'ui:title' ||
                    e === 'ui:description' ||
                    e === 'title' ||
                    e === 'description') &&
                typeof obj[e] === 'string'
            ) {
                obj[e] = translate(obj[e] as string);
            } else if (obj[e] instanceof Object) {
                //recursive on objects
                obj[e] = deepTranslate(obj[e], [...path, e]);
            }
        }

        return obj;
    };

    return translator;
};
