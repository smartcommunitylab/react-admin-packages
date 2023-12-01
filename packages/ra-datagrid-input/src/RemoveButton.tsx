import React from 'react';
import clsx from 'clsx';
import { Button, Identifier, RaRecord, useRecordContext } from 'react-admin';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export const RemoveButton = <RecordType extends RaRecord = any>(
    props: RemoveButtonProps
) => {
    const { onRemove } = props;
    const record = useRecordContext<RecordType>(props);

    const handleClick = (e: any) => {
        if (record) {
            onRemove(record.id);
        }
        e.stopPropagation();
    };
    return (
        <Button
            // label="ra.action.remove"
            onClick={handleClick}
            className={clsx(RemoveButtonClasses.root)}
            color="error"
        >
            <RemoveCircleOutlineIcon />
        </Button>
    );
};

export type RemoveButtonProps = {
    onRemove: (record: Identifier) => void;
};

const PREFIX = 'RaRemoveButton';

export const RemoveButtonClasses = {
    root: `${PREFIX}-root`,
};
