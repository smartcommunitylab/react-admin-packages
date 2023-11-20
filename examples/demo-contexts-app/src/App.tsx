import {
    Admin,
    Resource,
    ListGuesser,
    AppBar,
    Layout,
    TitlePortal,
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
import { OrganizationList } from './resources/organizations';

const dataProvider = jsonServerProvider('http://localhost:3000');

const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <RootResourceSelectorMenu source="name" showSelected={true} />
    </AppBar>
);
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
    return (
        <RootSelector resource="organizations" source="name">
            <Admin
                dataProvider={dataProvider}
                i18nProvider={i18nProvider}
                layout={MyLayout}
                // basename={basePath}
            >
                <Resource name="users" list={UserList} />
                <Resource name="organizations" />
            </Admin>
        </RootSelector>
    );
};

export default App;
