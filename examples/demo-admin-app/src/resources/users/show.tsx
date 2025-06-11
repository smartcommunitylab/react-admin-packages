import { JsonSchemaField } from '@dslab/ra-jsonschema-input';
import {
    EditButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useNotify,
} from 'react-admin';
import { InspectButton } from '@dslab/ra-inspect-button';
import { CopyToClipboardButton } from '@dslab/ra-inspect-button';
import { ExportRecordButton } from '@dslab/ra-export-record-button';
import { jsonSchema, uiSchema } from './edit';

// const uiSchema = {
//     // 'ui:title': 'address details',
//     suite: {
//         'ui:title': 'Primary address',
//     },
// };

// const jsonSchema = {
//     type: 'object',
//     required: ['street', 'city'],
//     properties: {
//         city: {
//             type: 'string',
//         },
//         street: {
//             type: 'string',
//         },
//         suite: {
//             type: 'string',
//         },
//         zipcode: {
//             type: 'string',
//             pattern: '(^\\d{5}$)|(^\\d{5}-\\d{4}$)',
//         },
//     },
// };

const ShowActions = () => {
    const notify = useNotify();

    const handleClick = () => {
        notify('ra.message.success');
    };

    return (
        <TopToolbar>
            <InspectButton
                language="yaml"
                showCopyButton
                showLineNumbers
                theme="light"
            />
            <CopyToClipboardButton
                value="example text"
                onSuccess={handleClick}
            />
            <ExportRecordButton language="yaml" />
            <EditButton />
        </TopToolbar>
    );
};

export const UserShow = () => (
    <Show actions={<ShowActions />}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <TextField source="email" />
            <JsonSchemaField
                schema={jsonSchema}
                uiSchema={uiSchema}
                source="address"
                // label={false}
            />
        </SimpleShowLayout>
    </Show>
);
