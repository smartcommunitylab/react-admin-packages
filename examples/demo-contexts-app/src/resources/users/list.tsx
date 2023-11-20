import {
    Datagrid,
    EmailField,
    List,
    NumberField,
    TextField,
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="organization" />
            <TextField source="username" />
            <TextField source="name" />
            <TextField source="surname" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);
