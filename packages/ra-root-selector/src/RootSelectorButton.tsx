import React from 'react';
import { Button, ShowButtonProps, useRecordContext } from 'react-admin';
import ImageEye from '@mui/icons-material/RemoveRedEye';
import { useRootSelector } from './RootSelectorContext';

const defaultIcon = <ImageEye />;

export const RootSelectorButton = (props: RootSelectorButtonProps) => {
    const {
        label = 'ra.action.show',
        icon = defaultIcon,
        record: recordProp,
        resource: resourceProp,
        ...rest
    } = props;
    const { selectContext } = useRootSelector();
    const record = useRecordContext(props);
    if (!record) return null;

    const handleClick = e => {
        if (record) {
            selectContext(record);
        }
        e.stopPropagation();
    };

    return (
        <Button label={label} onClick={handleClick} {...rest}>
            {icon}
        </Button>
    );
};

export type RootSelectorButtonProps = ShowButtonProps & {
    context?: string;
};

export default RootSelectorButton;
