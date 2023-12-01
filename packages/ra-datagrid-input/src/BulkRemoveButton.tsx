import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import clsx from 'clsx';
import React from 'react';
import { BulkActionProps, Button, ButtonProps, Identifier } from 'react-admin';

export const BulkRemoveButton = (props: BulkRemoveButtonProps) => {
    const { label = 'ra.action.remove', onButtonClick, selectedIds } = props;

    const onClick = (e: any) => {
        onButtonClick(selectedIds ? selectedIds : []);
        e.stopPropagation();
    };
    return (
        <Button
            label={label}
            onClick={e => onClick(e)}
            className={clsx(BulkRemoveButtonClasses.root)}
            color="error"
        >
            <RemoveCircleOutlineIcon />
        </Button>
    );
};

export type BulkRemoveButtonProps = {
    onButtonClick: (selectedIds: Identifier[]) => void;
    label?: string;
} & ButtonProps &
    BulkActionProps;

const PREFIX = 'RaBulkRemoveButton';

export const BulkRemoveButtonClasses = {
    root: `${PREFIX}-root`,
};
