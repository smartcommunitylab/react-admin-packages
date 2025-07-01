import {
    Admin,
    Resource,
    AppBar,
    Layout,
    TitlePortal,
    ShowGuesser,
    LayoutProps,
} from 'react-admin';
import {
    RootResourceSelectorMenu,
    RootSelector,
} from '@dslab/ra-root-selector';
import { i18nProvider } from './i18nprovider';
import { UserList } from './resources/users';
import {
    OrganizationCreate,
    OrganizationEdit,
    OrganizationSelectorList,
} from './resources/organizations';
import dataProvider from './dataProvider';
import { GroupCreate, GroupEdit, GroupList } from './resources/groups';

const myDataProvider = dataProvider('http://localhost:3000');

const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <RootResourceSelectorMenu source="name" showSelected={false} />
    </AppBar>
);
const MyLayout = (props: LayoutProps) => (
    <Layout {...props} appBar={MyAppBar} />
);

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
                <Resource
                    name="users"
                    list={UserList}
                    recordRepresentation="name"
                    show={ShowGuesser}
                />
                <Resource
                    name="groups"
                    list={GroupList}
                    edit={GroupEdit}
                    create={GroupCreate}
                />

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
