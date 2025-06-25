import { CSSProperties } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
    ArrayFieldItemTemplateType,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldItemTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: ArrayFieldItemTemplateType<T, S, F>) {
    const {
        children,
        disabled,
        buttonsProps,
        hasToolbar,
        index,
        readonly,
        uiSchema,
        registry,
    } = props;

    const {
        hasCopy,
        hasMoveDown,
        hasMoveUp,
        hasRemove,
        onCopyIndexClick,
        onDropIndexClick,
        onReorderClick,
    } = buttonsProps;

    const { CopyButton, MoveDownButton, MoveUpButton, RemoveButton } =
        registry.templates.ButtonTemplates;
    const btnStyle: CSSProperties = {
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
        fontWeight: 'bold',
        minWidth: 0,
        marginTop: 16,
        minHeight: 40,
    };

    return (
        <Grid container={true} alignItems="top">
            <Grid size="grow" style={{ overflow: 'auto' }}>
                <Box>
                    <Box>{children}</Box>
                </Box>
            </Grid>
            {hasToolbar && !readonly && (
                <Grid>
                    {(hasMoveUp || hasMoveDown) && (
                        <MoveUpButton
                            style={btnStyle}
                            disabled={disabled || readonly || !hasMoveUp}
                            onClick={onReorderClick(index, index - 1)}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    )}
                    {(hasMoveUp || hasMoveDown) && (
                        <MoveDownButton
                            style={btnStyle}
                            disabled={disabled || readonly || !hasMoveDown}
                            onClick={onReorderClick(index, index + 1)}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    )}
                    {hasCopy && (
                        <CopyButton
                            style={btnStyle}
                            disabled={disabled || readonly}
                            onClick={onCopyIndexClick(index)}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    )}
                    {hasRemove && (
                        <RemoveButton
                            style={btnStyle}
                            disabled={disabled || readonly}
                            onClick={onDropIndexClick(index)}
                            uiSchema={uiSchema}
                            registry={registry}
                        />
                    )}
                </Grid>
            )}
        </Grid>
    );
}
