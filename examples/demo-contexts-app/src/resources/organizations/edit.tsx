import { Edit, SimpleForm, TextInput } from 'react-admin';

export const OrganizationEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="country" />
            <TextInput source="url" />
        </SimpleForm>
    </Edit>
);
