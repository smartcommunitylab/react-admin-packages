import { CreateInDialogButton } from '@dslab/ra-create-in-dialog-button';
import {
    Datagrid,
    EmailField,
    Empty,
    List,
    ReferenceField,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';
import { useParams } from 'react-router-dom';

const CreateUserComponent = () => {
    const { context } = useParams();

    const transform = (data: any) => ({
        ...data,
        organization: context,
    });

    return (
        <CreateInDialogButton
            fullWidth={true}
            maxWidth="sm"
            transform={transform}
        >
            <SimpleForm>
                <TextInput source="username" fullWidth={true} />
                <TextInput source="name" fullWidth={true} />
                <TextInput source="surname" fullWidth={true} />
                <TextInput source="email" fullWidth={true} />
            </SimpleForm>
        </CreateInDialogButton>
    );
};

const ListActions = () => (
    <TopToolbar>
        <CreateUserComponent />
    </TopToolbar>
);

const EmptyComponent = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Empty />
            <CreateUserComponent />
        </div>
    );
};

export const UserList = () => {
    return (
        <List
            actions={<ListActions />}
            empty={<EmptyComponent />}
            sx={{ justifyContent: 'center' }}
        >
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
