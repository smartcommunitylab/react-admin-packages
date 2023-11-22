import {
    Admin,
    Resource,
    ListGuesser,
    AppBar,
    Layout,
    TitlePortal,
    Datagrid,
    List,
    TextField,
    ShowGuesser,
    EditGuesser,
    CreateButton,
    TopToolbar,
} from 'react-admin';
import { BrowserRouter, useParams } from 'react-router-dom';
import {
    RootResourceSelectorMenu,
    RootSelector,
} from '@dslab/ra-root-selector';
import jsonServerProvider from 'ra-data-json-server';
import { i18nProvider } from './i18nprovider';
import { useRootSelector } from '@dslab/ra-root-selector';
import { UserList } from './resources/users';
import {
    OrganizationCreate,
    OrganizationEdit,
    OrganizationList,
    OrganizationSelectorList,
} from './resources/organizations';
import { RootSelectorButton } from '@dslab/ra-root-selector';
import dataProvider from './dataProvider';

const myDataProvider = dataProvider('http://localhost:3000');

const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <RootResourceSelectorMenu source="name" showSelected={false} />
    </AppBar>
);
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
    return (
        <RootSelector
            resource="organizations"
            selector={<OrganizationSelectorList />}
        >
            <Admin
                dataProvider={myDataProvider}
                i18nProvider={i18nProvider}
                layout={MyLayout}
                // basename={basePath}
            >
                <Resource name="users" list={UserList} />
                <Resource
                    name="organizations"
                    list={OrganizationSelectorList}
                    edit={OrganizationEdit}
                    create={OrganizationCreate}
                />
            </Admin>
        </RootSelector>
    );
};

export default App;
