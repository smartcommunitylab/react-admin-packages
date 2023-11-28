import {
    CreateButton,
    Datagrid,
    DeleteWithConfirmButton,
    EmailField,
    List,
    TextField,
    TopToolbar,
} from 'react-admin';
import yamlExporter from '@dslab/ra-export-yaml';
import {
    DeleteWithConfirmDialog,
    DeleteWithDialogButton,
} from '@dslab/ra-delete-dialog-button';

export const UserList = () => {
    return (
        <List exporter={yamlExporter}>
            <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="username" />
                <EmailField source="email" />
                <TextField source="address.street" />
                <TextField source="phone" />
                <TextField source="website" />
                <TextField source="company.name" />
                <DeleteWithConfirmButton />
                <DeleteWithDialogButton
                    source="email"
                    label="delete w/dialog"
                />
            </Datagrid>
        </List>
    );
};
