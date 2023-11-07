import {
    Datagrid,
    List,
    ReferenceField,
    TextField,
    TopToolbar,
} from 'react-admin';
import { ExportAllButton } from '@dslab/ra-export-all-button';

const ListActions = () => (
    <TopToolbar>
        <ExportAllButton />
    </TopToolbar>
);

export const PostList = () => (
    <List actions={<ListActions />}>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </Datagrid>
    </List>
);
