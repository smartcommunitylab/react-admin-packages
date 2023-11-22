import { useEffect } from 'react';
import {
    Datagrid,
    EmailField,
    List,
    NumberField,
    ReferenceField,
    TextField,
    useDataProvider,
} from 'react-admin';

export const UserList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                {/* <NumberField source="organization" /> */}
                <ReferenceField source="organization" reference="organizations">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="username" />
                <TextField source="name" />
                <TextField source="surname" />
                <EmailField source="email" />
            </Datagrid>
        </List>
    );
};
