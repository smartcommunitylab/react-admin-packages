import Grid from '@mui/material/Grid';
import {
    FormContextType,
    ObjectFieldTemplateProps,
    RJSFSchema,
    StrictRJSFSchema,
    canExpand,
    descriptionId,
    getTemplate,
    getUiOptions,
    titleId,
} from '@rjsf/utils';
import React from 'react';

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: ObjectFieldTemplateProps<T, S, F>) {
    const {
        description,
        title,
        properties,
        required,
        disabled,
        readonly,
        uiSchema,
        idSchema,
        schema,
        formData,
        onAddClick,
        registry,
    } = props;
    const uiOptions = getUiOptions<T, S, F>(uiSchema);
    const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>(
        'TitleFieldTemplate',
        registry,
        uiOptions
    );
    const DescriptionFieldTemplate = getTemplate<
        'DescriptionFieldTemplate',
        T,
        S,
        F
    >('DescriptionFieldTemplate', registry, uiOptions);
    // Button templates are not overridden in the uiSchema
    const {
        ButtonTemplates: { AddButton },
    } = registry.templates;

    //custom layout support
    const { layout } = getUiOptions<T, S, F>(uiSchema);

    console.log('obj props', title, uiOptions, layout);
    return (
        <>
            {title && (
                <TitleFieldTemplate
                    id={titleId<T>(idSchema)}
                    title={title}
                    required={required}
                    schema={schema}
                    uiSchema={uiSchema}
                    registry={registry}
                />
            )}
            {description && (
                <DescriptionFieldTemplate
                    id={descriptionId<T>(idSchema)}
                    description={description}
                    schema={schema}
                    uiSchema={uiSchema}
                    registry={registry}
                />
            )}
            <Grid container={true} spacing={2}>
                {properties.map((element, index) => {
                    //override layout
                    let width = 12;
                    if (
                        layout &&
                        layout instanceof Array &&
                        layout.length > index &&
                        typeof layout[index] === 'number'
                    ) {
                        width = layout[index];
                    }

                    // Remove the <Grid> if the inner element is hidden as the <Grid>
                    // itself would otherwise still take up space.
                    return element.hidden ? (
                        element.content
                    ) : (
                        <Grid item={true} xs={width} key={index}>
                            {element.content}
                        </Grid>
                    );
                })}
                {canExpand<T, S, F>(schema, uiSchema, formData) && (
                    <Grid container justifyContent="flex-end">
                        <Grid item={true}>
                            <AddButton
                                className="object-property-expand"
                                onClick={onAddClick(schema)}
                                disabled={disabled || readonly}
                                uiSchema={uiSchema}
                                registry={registry}
                            />
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
