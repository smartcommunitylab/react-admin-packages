import React from 'react';
import clsx from 'clsx';
import { BulkActionProps, Button, Identifier } from 'react-admin';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const BulkRemoveButton = (props: BulkRemoveButtonProps) => {
    const { onRemove, selectedIds } = props;

    const handleClick = (e: any) => {
        if (selectedIds) {
            onRemove(selectedIds);
        }
        e.stopPropagation();
    };
    return (
        <Button
            label="ra.action.remove"
            onClick={handleClick}
            className={clsx(BulkRemoveButtonClasses.root)}
            color="error"
        >
            <RemoveCircleOutlineIcon />
        </Button>
    );
};

export type BulkRemoveButtonProps = {
    onRemove: (selectedIds: Identifier[]) => void;
} & BulkActionProps;

const PREFIX = 'RaBulkRemoveButton';

export const BulkRemoveButtonClasses = {
    root: `${PREFIX}-root`,
};
