import {
    CreateInDialogButton,
    EditInDialogButton,
    ShowInDialogButton,
    useDialogContext,
} from '@dslab/ra-dialog-crud';
import { useRootSelector } from '@dslab/ra-root-selector';
import {
    Button,
    Datagrid,
    EmailField,
    Empty,
    FunctionField,
    List,
    ReferenceField,
    ShowButton,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar,
    TransformData,
    required,
} from 'react-admin';
import { Typography, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';

const CreateUserComponent = () => {
    const { context } = useParams();

    const transform: TransformData = data => ({
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
                <TextInput
                    source="username"
                    fullWidth={true}
                    validate={required()}
                />
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

const ShowDialogContent = () => {
    const { handleClose } = useDialogContext();

    return (
        <SimpleShowLayout>
            <ReferenceField source="organization" reference="organizations">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="username" />
            <TextField source="name" />
            <TextField source="surname" />
            <EmailField source="email" />
            <ShowButton />
            <DialogActions>
                <FunctionField
                    render={() => {
                        return <Button onClick={handleClose} label="close" />;
                    }}
                />
            </DialogActions>
        </SimpleShowLayout>
    );
};

export const UserList = () => {
    const { base, root } = useRootSelector();
    console.log('base', base);
    console.log('root', root);

    return (
        <>
            <Typography variant={'h5'}>org #{root}</Typography>

            <List
                actions={<ListActions />}
                empty={<EmptyComponent />}
                sx={{ justifyContent: 'center' }}
            >
                <Datagrid>
                    <TextField source="id" />
                    {/* <NumberField source="organization" /> */}
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

                    <ShowInDialogButton fullWidth={true} maxWidth="sm">
                        <ShowDialogContent />
                    </ShowInDialogButton>

                    <EditInDialogButton
                        fullWidth={true}
                        maxWidth="sm"
                        mutationMode="pessimistic"
                    >
                        <SimpleForm>
                            <TextInput
                                source="username"
                                fullWidth={true}
                                validate={required()}
                            />
                            <TextInput source="name" fullWidth={true} />
                            <TextInput source="surname" fullWidth={true} />
                            <TextInput source="email" fullWidth={true} />
                        </SimpleForm>
                    </EditInDialogButton>
                </Datagrid>
            </List>
        </>
    );
};
