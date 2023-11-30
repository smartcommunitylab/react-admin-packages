import {
    Datagrid,
    Exporter,
    List,
    ReferenceField,
    TextField,
    TopToolbar,
    downloadCSV,
} from 'react-admin';
import { ExportAllButton } from '@dslab/ra-export-all-button';
import yamlExporter from '@dslab/ra-export-yaml';
import { yamlExport } from '@dslab/ra-export-yaml';
import { downloadYaml } from '@dslab/ra-export-yaml';
import { InspectButton } from '@dslab/ra-inspect-button';
import { ExportRecordButton, toYaml } from '@dslab/ra-export-record-button';

const listExporter: Exporter = (
    data,
    fetchRelatedRecords,
    dataProvider,
    resource
) => {
    fetchRelatedRecords(data, 'userId', 'users').then(users => {
        const res = data.map(record => ({
            ...record,
            username: users[record.userId].username,
            user: users[record.userId],
        }));

        const value = yamlExport(res, resource);
        downloadYaml(value, resource);
    });
};

const recordExporter: Exporter = (
    data,
    fetchRelatedRecords,
    dataProvider,
    resource
) => {
    fetchRelatedRecords(data, 'userId', 'users').then(users => {
        const res = data.map(record => ({
            ...record,
            username: users[record.userId].username,
            user: users[record.userId],
        }));

        //single record, list shoud contain 1 element
        const r = res && res.length > 0 ? res[0] : null;
        if (r) {
            downloadYaml(toYaml(r, resource), `${resource}_${r.id}`);
        }
    });
};

const ListActions = () => (
    <TopToolbar>
        <ExportAllButton />
    </TopToolbar>
);

export const PostList = () => (
    <List actions={<ListActions />} exporter={listExporter}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <InspectButton showCopyButton={false} fullWidth />
            <ExportRecordButton exporter={recordExporter} />
        </Datagrid>
    </List>
);
