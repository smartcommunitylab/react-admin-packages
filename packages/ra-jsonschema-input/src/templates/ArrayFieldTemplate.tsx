import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    FormHelperText,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    getTemplate,
    getUiOptions,
    ArrayFieldTemplateProps,
    ArrayFieldTemplateItemType,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';
import { useTranslate } from 'react-admin';

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function ArrayFieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: ArrayFieldTemplateProps<T, S, F>) {
    const translate = useTranslate();

    const {
        canAdd,
        disabled,
        idSchema,
        uiSchema,
        items,
        onAddClick,
        readonly,
        registry,
        required,
        schema,
        title,
    } = props;
    const uiOptions = getUiOptions<T, S, F>(uiSchema);
    const ArrayFieldDescriptionTemplate = getTemplate<
        'ArrayFieldDescriptionTemplate',
        T,
        S,
        F
    >('ArrayFieldDescriptionTemplate', registry, uiOptions);
    const ArrayFieldItemTemplate = getTemplate<
        'ArrayFieldItemTemplate',
        T,
        S,
        F
    >('ArrayFieldItemTemplate', registry, uiOptions);
    const ArrayFieldTitleTemplate = getTemplate<
        'ArrayFieldTitleTemplate',
        T,
        S,
        F
    >('ArrayFieldTitleTemplate', registry, uiOptions);
    // Button templates are not overridden in the uiSchema
    const {
        ButtonTemplates: { AddButton },
    } = registry.templates;

    const itemProps = uiSchema && uiSchema.items ? uiSchema.items : {};
    const itemName = itemProps['ui:title'] || uiOptions.title || title;

    //custom layout support
    const { expandable } = getUiOptions<T, S, F>(uiSchema);

    if (expandable && typeof expandable === 'boolean' && expandable === true) {
        return (
            <Box>
                <Accordion elevation={0} square disableGutters>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ padding: 0 }}
                    >
                        <ArrayFieldTitleTemplate
                            idSchema={idSchema}
                            title={uiOptions.title || title}
                            schema={schema}
                            uiSchema={uiSchema}
                            required={required}
                            registry={registry}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        {items &&
                            items.map(
                                ({
                                    key,
                                    ...itemProps
                                }: ArrayFieldTemplateItemType<T, S, F>) => (
                                    <ArrayFieldItemTemplate
                                        key={key}
                                        {...itemProps}
                                    />
                                )
                            )}
                        {canAdd && !readonly && (
                            <Grid container justifyContent="flex-start">
                                <Grid>
                                    <Box mt={2}>
                                        <Button
                                            className="array-item-add"
                                            onClick={onAddClick}
                                            disabled={disabled || readonly}
                                            variant="text"
                                            size="small"
                                            startIcon={<AddIcon />}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            <FormHelperText
                                                component={'span'}
                                                sx={{ marginLeft: 0 }}
                                            >
                                                {translate(
                                                    'ra.action.create_item',
                                                    {
                                                        item: itemName,
                                                    }
                                                )}
                                            </FormHelperText>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                        <ArrayFieldDescriptionTemplate
                            idSchema={idSchema}
                            description={
                                uiOptions.description || schema.description
                            }
                            schema={schema}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    </AccordionDetails>
                </Accordion>
                <Divider />
            </Box>
        );
    }

    return (
        <Box>
            <ArrayFieldTitleTemplate
                idSchema={idSchema}
                title={uiOptions.title || title}
                schema={schema}
                uiSchema={uiSchema}
                required={required}
                registry={registry}
            />
            {items &&
                items.map(
                    ({
                        key,
                        ...itemProps
                    }: ArrayFieldTemplateItemType<T, S, F>) => (
                        <ArrayFieldItemTemplate key={key} {...itemProps} />
                    )
                )}
            {canAdd && !readonly && (
                <Grid container justifyContent="flex-start">
                    <Grid>
                        <Box mt={2}>
                            <Button
                                className="array-item-add"
                                onClick={onAddClick}
                                disabled={disabled || readonly}
                                variant="text"
                                size="small"
                                startIcon={<AddIcon />}
                                sx={{ textTransform: 'none' }}
                            >
                                <FormHelperText
                                    component={'span'}
                                    sx={{ marginLeft: 0 }}
                                >
                                    {translate('ra.action.create_item', {
                                        item: itemName,
                                    })}
                                </FormHelperText>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
            <ArrayFieldDescriptionTemplate
                idSchema={idSchema}
                description={uiOptions.description || schema.description}
                schema={schema}
                uiSchema={uiSchema}
                registry={registry}
            />
        </Box>
    );
}
