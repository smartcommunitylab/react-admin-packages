import { DatagridArrayInput } from '@dslab/ra-datagrid-input';
import {
    Create,
    NumberInput,
    ReferenceArrayInput,
    SimpleForm,
    TextInput,
} from 'react-admin';

const dialogFilters = [<TextInput label="name" source="name" />];

export const GroupCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="id" />
            <NumberInput source="organization" />
            <TextInput source="name" />
            <ReferenceArrayInput reference="users" source="users">
                <DatagridArrayInput dialogFilters={dialogFilters}>
                    {/* <TextField source="email" /> */}
                </DatagridArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);
