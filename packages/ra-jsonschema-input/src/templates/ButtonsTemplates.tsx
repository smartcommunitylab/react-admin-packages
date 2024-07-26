import ArrowUpwardIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowDownwardIcon from '@mui/icons-material/ArrowCircleDown';
import CopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddCircleOutline';

import CloseIcon from '@mui/icons-material/RemoveCircleOutline';

import {
    FormContextType,
    IconButtonProps,
    RJSFSchema,
    StrictRJSFSchema,
} from '@rjsf/utils';
import React from 'react';
import { IconButtonWithTooltip } from 'react-admin';

export function AddButton<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>) {
    return (
        <IconButtonWithTooltip
            label="ra.action.add"
            size="small"
            color={'primary'}
            {...props}
        >
            <AddIcon fontSize="small" />
        </IconButtonWithTooltip>
    );
}

export function CopyButton<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>) {
    return (
        <IconButtonWithTooltip
            label="ra.action.copy"
            size="small"
            color={'primary'}
            {...props}
        >
            <CopyIcon fontSize="small" />
        </IconButtonWithTooltip>
    );
}

export function MoveDownButton<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>) {
    return (
        <IconButtonWithTooltip
            label="ra.action.move_down"
            size="small"
            color={'secondary'}
            {...props}
        >
            <ArrowDownwardIcon fontSize="small" />
        </IconButtonWithTooltip>
    );
}

export function MoveUpButton<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>) {
    return (
        <IconButtonWithTooltip
            label="ra.action.move_up"
            size="small"
            color={'secondary'}
            {...props}
        >
            <ArrowUpwardIcon fontSize="small" />
        </IconButtonWithTooltip>
    );
}

export function RemoveButton<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>({ uiSchema, registry, color, ...props }: IconButtonProps<T, S, F>) {
    return (
        <IconButtonWithTooltip
            label="ra.action.remove"
            size="small"
            color={'warning'}
            {...props}
        >
            <CloseIcon fontSize="small" />
        </IconButtonWithTooltip>
    );
}

export default {
    AddButton,
    RemoveButton,
    MoveUpButton,
    MoveDownButton,
    CopyButton,
};
