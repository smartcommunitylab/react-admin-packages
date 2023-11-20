import { Datagrid, List, TextField, UrlField } from 'react-admin';

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
