import { DatagridArrayInput } from '@dslab/ra-datagrid-input';
import {
    Edit,
    NumberInput,
    ReferenceArrayInput,
    SelectArrayInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';

export const GroupEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <NumberInput source="organization" />
            <TextInput source="name" />
            <ReferenceArrayInput reference="users" source="users">
                <DatagridArrayInput>
                    {/* <TextField source="name" /> */}
                </DatagridArrayInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
