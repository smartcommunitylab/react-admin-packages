import { useEffect } from 'react';
import {
    Datagrid,
    EmailField,
    List,
    NumberField,
    ReferenceField,
    SimpleForm,
    TextField,
    TextInput,
    useDataProvider,
} from 'react-admin';
import { EditInDialogButton } from '@dslab/ra-edit-in-dialog-button';

export const UserList = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                {/* <NumberField source="organization" /> */}
                <ReferenceField source="organization" reference="organizations">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="username" />
                <TextField source="name" />
                <TextField source="surname" />
                <EmailField source="email" />
                <EditInDialogButton
                    fullWidth={true}
                    maxWidth="sm"
                    mutationMode="undoable"
                >
                    <SimpleForm>
                        <TextInput source="username" fullWidth={true} />
                        <TextInput source="name" fullWidth={true} />
                        <TextInput source="surname" fullWidth={true} />
                        <TextInput source="email" fullWidth={true} />
                    </SimpleForm>
                </EditInDialogButton>
            </Datagrid>
        </List>
    );
};
