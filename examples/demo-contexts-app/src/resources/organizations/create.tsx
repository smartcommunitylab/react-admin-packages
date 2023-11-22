import { Create, SimpleForm, TextInput } from 'react-admin';

export const OrganizationCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="country" />
            <TextInput source="url" />
        </SimpleForm>
    </Create>
);
