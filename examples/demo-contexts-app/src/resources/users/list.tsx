import {
    CreateInDialogButton,
    EditInDialogButton,
    ShowInDialogButton,
} from '@dslab/ra-dialog-crud';
import {
    Datagrid,
    EmailField,
    Empty,
    List,
    ReferenceField,
    SimpleForm,
    SimpleShowLayout,
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

                <ShowInDialogButton fullWidth={true} maxWidth="sm">
                    <SimpleShowLayout>
                        <ReferenceField
                            source="organization"
                            reference="organizations"
                        >
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="username" />
                        <TextField source="name" />
                        <TextField source="surname" />
                        <EmailField source="email" />
                    </SimpleShowLayout>
                </ShowInDialogButton>

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
