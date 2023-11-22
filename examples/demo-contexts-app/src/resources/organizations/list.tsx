import { RootSelectorButton } from '@dslab/ra-root-selector';
import {
    CreateButton,
    Datagrid,
    List,
    TextField,
    TopToolbar,
    UrlField,
} from 'react-admin';

export const OrganizationList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="country" />
            <UrlField source="url" />
        </Datagrid>
    </List>
);

export const OrganizationSelectorList = props => {
    const Toolbar = () => {
        return (
            <TopToolbar>
                <CreateButton />
            </TopToolbar>
        );
    };

    return (
        <List {...props} actions={<Toolbar />} perPage={50}>
            <Datagrid rowClick={false} bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="country" />
                <UrlField source="url" />
                <RootSelectorButton />
            </Datagrid>
        </List>
    );
};
