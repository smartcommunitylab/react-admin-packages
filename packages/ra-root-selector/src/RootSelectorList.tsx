import React, { useEffect } from 'react';
import {
    Datagrid,
    ListBase,
    ListProps,
    ListView,
    LoadingIndicator,
    TextField,
    TopToolbar,
    useListContext,
} from 'react-admin';
import RootSelectorButton from './RootSelectorButton';
import { useRootSelector } from './RootSelectorContext';

const DummyActions = () => <TopToolbar></TopToolbar>;

const RootSelectorListView = (props: RootSelectorListProps) => {
    const { source = 'id', skipToFirst = false } = props;
    const { data, isLoading } = useListContext();
    const { selectRoot } = useRootSelector();

    useEffect(() => {
        if (skipToFirst && !isLoading && data) {
            const record = data.at(0);
            if (record) {
                selectRoot(record);
            }
        }
    }, [data, isLoading, selectRoot, skipToFirst]);

    if (skipToFirst) {
        //always disable render if skip is set
        return <LoadingIndicator />;
    }

    return (
        <ListView {...props} actions={<DummyActions />}>
            <Datagrid rowClick={false} bulkActionButtons={false}>
                <TextField source={source} />
                <RootSelectorButton />
            </Datagrid>
        </ListView>
    );
};
export const RootSelectorList = (props: RootSelectorListProps) => {
    return (
        <ListBase {...props}>
            <RootSelectorListView {...props} />
        </ListBase>
    );
};

export type RootSelectorListProps = Omit<ListProps, 'children'> & {
    source?: string;
    skipToFirst?: boolean;
};
