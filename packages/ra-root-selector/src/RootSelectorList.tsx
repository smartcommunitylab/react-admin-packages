import React from 'react';
import { Datagrid, List, ListProps, TextField, TopToolbar } from 'react-admin';
import RootSelectorButton from './RootSelectorButton';

const DummyActions = () => <TopToolbar></TopToolbar>;

export const RootSelectorList = (props: RootSelectorListProps) => {
    const { source = 'id' } = props;

    return (
        <List {...props} actions={<DummyActions />}>
            <Datagrid rowClick={false} bulkActionButtons={false}>
                <TextField source={source} />
                <RootSelectorButton />
            </Datagrid>
        </List>
    );
};

export type RootSelectorListProps = Omit<ListProps, 'children'> & {
    source?: string;
};
