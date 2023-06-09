import React from 'react';
import { Admin, Resource, List, Edit, Create, Show } from 'react-admin';
import {
    SimpleList,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';

import fakeRestProvider from 'ra-data-fakerest';
import { createMemoryHistory } from 'history';

import { AceEditorField } from '../components/AceEditorField';
import { AceEditorInput } from '../components/AceEditorInput';

export default {
    title: 'ra-ace-editor/Full Application',
};

const dataProvider = fakeRestProvider(
    {
        posts: [
            {
                id: 1,
                title: 'Lorem Ipsum',
                body: 'Some <strong>html</strong> text',
            },
            {
                id: 2,
                title: 'Sic dolor amet',
                body: 'Some <strong>html</strong> text',
            },
        ],
    },
    true
);

export const FullApplication = () => (
    <Admin history={createMemoryHistory()} dataProvider={dataProvider}>
        <Resource
            name="posts"
            list={
                <List>
                    <SimpleList
                        primaryText={(record: any): string => record.title}
                    />
                </List>
            }
            edit={
                <Edit>
                    <SimpleForm>
                        <TextInput source="title" />
                        <AceEditorInput source="body" />
                    </SimpleForm>
                </Edit>
            }
            show={
                <Show>
                    <SimpleShowLayout>
                        <TextField source="title" />
                        <AceEditorField source="body" theme="github" />
                    </SimpleShowLayout>
                </Show>
            }
            create={
                <Create>
                    <SimpleForm>
                        <TextInput source="title" />
                        <AceEditorInput source="body" />
                    </SimpleForm>
                </Create>
            }
        />
    </Admin>
);
