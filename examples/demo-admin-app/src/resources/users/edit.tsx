import { JsonSchemaInput } from '@dslab/ra-jsonschema-input';
import {
    ArrayInput,
    Edit,
    Labeled,
    NumberInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';

export const uiSchema = {
    'ui:title': 'text',
    'ui:description':
        'A very long description of addresses as text fields with schema and widgets',
    'ui:layout': [6, 2, 4, 12],
    'ui:order': [
        'street',
        'zipcode',
        'city',
        'suite',
        'addresses',
        'multipleChoicesList',
        'complex',
        'entries',
    ],
    suite: {
        // 'ui:title': 'Primary address',
        'ui:description': 'the address form',
    },
    city: {
        // 'ui:title': 'ra.action.remove',
    },
    zipcode: {
        // 'ui:title': 'ra.action.remove',
        label: false,
    },
    multipleChoicesList: {},
    complex: {
        'ui:expandable': true,
        'ui:layout': [4, 8],
        additionalProperties: {
            'ui:title': 'key',
        },
    },
    entries: {
        // 'ui:orderable': false,
        // 'ui:inline': true,
        items: {
            'ui:title': 'test',
            'ui:layout': [4, 8],
            'ui:label': false,
        },
    },
};
export const jsonSchema = {
    type: 'object',
    required: ['street', 'city'],
    title: 'test',
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
        addresses: {
            type: 'array',
            // title: 'addresses',
            description: 'address details',
            items: {
                type: 'string',
            },
            uniqueItems: true,
        },
        zipcode: {
            type: 'string',
            pattern: '(^\\d{5}$)|(^\\d{5}-\\d{4}$)',
        },
        multipleChoicesList: {
            type: 'array',
            // title: 'A multiple choices list',
            items: {
                type: 'string',
                enum: ['foo', 'bar', 'fuzz', 'qux'],
            },
            uniqueItems: true,
        },
        complex: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                },
                value: {
                    type: 'string',
                },
            },
            additionalProperties: {
                type: 'string',
            },
        },
        entries: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    key: {
                        type: 'string',
                    },
                    value: {
                        type: 'string',
                    },
                },
                required: ['key'],
            },
        },
    },
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <Labeled>
                <TextInput source="id" helperText="identifier of the user" />
            </Labeled>
            <TextInput source="name" />
            <TextInput source="username" />
            <TextInput source="email" />
            <JsonSchemaInput
                schema={jsonSchema}
                uiSchema={uiSchema}
                source="address"
                // label="Address"
                // label={false}
                helperText="Fill the form"
                // helperText={false}
            />
            <ArrayInput source="items" helperText="item lists">
                <SimpleFormIterator inline>
                    <TextInput source="name" helperText="name te" />
                    <NumberInput source="price" helperText={false} />
                    <NumberInput source="quantity" helperText={false} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);
