import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import clsx from 'clsx';
import React from 'react';
import {
    Button,
    ButtonProps,
    Identifier,
    RaRecord,
    useRecordContext,
} from 'react-admin';

export const RemoveButton = <RecordType extends RaRecord = any>(
    props: RemoveButtonProps
) => {
    const { label = 'ra.action.remove', onButtonClick } = props;
    const record = useRecordContext<RecordType>(props);

    const onClick = (e: any) => {
        onButtonClick([record.id]);
        e.stopPropagation();
    };
    return (
        <Button
            label={label}
            onClick={e => onClick(e)}
            className={clsx(RemoveButtonClasses.root)}
            color="error"
        >
            <RemoveCircleOutlineIcon />
        </Button>
    );
};

export type RemoveButtonProps = {
    onButtonClick: (record: Identifier[]) => void;
    label?: string;
} & ButtonProps;

const PREFIX = 'RaRemoveButton';

export const RemoveButtonClasses = {
    root: `${PREFIX}-root`,
};
