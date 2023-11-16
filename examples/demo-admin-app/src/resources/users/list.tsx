import { Datagrid, EmailField, List, TextField } from 'react-admin';
import yamlExporter from '@dslab/ra-export-yaml';

export const UserList = () => (
    <List exporter={yamlExporter}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);
