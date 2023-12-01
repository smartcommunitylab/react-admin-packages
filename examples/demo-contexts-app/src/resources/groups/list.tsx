import {
    Datagrid,
    FunctionField,
    List,
    NumberField,
    TextField,
} from 'react-admin';

export const GroupList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <NumberField source="organization" />
            <TextField source="name" />
            <FunctionField
                render={record => `${record.users?.length}`}
                label="Users"
            />
        </Datagrid>
    </List>
);
