import { Breadcrumb } from '@dslab/ra-breadcrumb';
import { JsonSchemaInput } from '@dslab/ra-jsonschema-input';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const uiSchema = {
    suite: {
        'ui:title': 'Primary address',
        'ui:description': 'the address form',
    },
};
const jsonSchema = {
    type: 'object',
    required: ['street', 'city'],
    properties: {
        city: {
            type: 'string',
        },
        street: {
            type: 'string',
        },
        suite: {
            type: 'string',
        },
        zipcode: {
            type: 'string',
            pattern: '(^\\d{5}$)|(^\\d{5}-\\d{4}$)',
        },
    },
};

export const UserEdit = () => (
    <>
        <Breadcrumb />
        <Edit>
            <SimpleForm>
                <TextInput source="id" />
                <TextInput source="name" />
                <TextInput source="username" />
                <TextInput source="email" />
                <JsonSchemaInput
                    schema={jsonSchema}
                    uiSchema={uiSchema}
                    source="address"
                />
            </SimpleForm>
        </Edit>
    </>
);
