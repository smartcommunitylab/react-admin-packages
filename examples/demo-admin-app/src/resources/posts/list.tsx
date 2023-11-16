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

const exporter: Exporter = (
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

const ListActions = () => (
    <TopToolbar>
        <ExportAllButton />
    </TopToolbar>
);

export const PostList = () => (
    <List actions={<ListActions />} exporter={exporter}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);
