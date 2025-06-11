import { DatagridArrayInput } from '@dslab/ra-datagrid-input';
import {
    Edit,
    NumberInput,
    ReferenceArrayInput,
    SimpleForm,
    TextInput,
} from 'react-admin';

const dialogFilters = [<TextInput label="name" source="name" />];

export const GroupEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <NumberInput source="organization" />
            <TextInput source="name" />
            <ReferenceArrayInput reference="users" source="users">
                <DatagridArrayInput dialogFilters={dialogFilters}>
                    {/* <TextField source="email" /> */}
                </DatagridArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
