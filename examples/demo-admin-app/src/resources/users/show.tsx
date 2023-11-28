import { JsonSchemaField } from '@dslab/ra-jsonschema-input';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

const uiSchema = {
    // 'ui:title': 'address details',
    suite: {
        'ui:title': 'Primary address',
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

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="email" />
            <JsonSchemaField
                schema={jsonSchema}
                uiSchema={uiSchema}
                source="address"
                label={false}
            />
        </SimpleShowLayout>
    </Show>
);
