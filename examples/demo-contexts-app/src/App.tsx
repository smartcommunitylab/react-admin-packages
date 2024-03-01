import {
    Admin,
    Resource,
    AppBar,
    Layout,
    TitlePortal,
    TextInput,
    fetchUtils,
    CustomRoutes,
    TextField,
} from 'react-admin';
import { Route } from "react-router-dom";
import {
    RootResourceSelectorMenu,
    RootSelector,
} from '@dslab/ra-root-selector';
import {
    SearchBar,
    Search,
} from '@dslab/ra-search-bar';
import { i18nProvider } from './i18nprovider';
import { UserList } from './resources/users';
import {
    OrganizationCreate,
    OrganizationEdit,
    OrganizationSelectorList,
} from './resources/organizations';
import dataProvider from './dataProvider';
import { SearchList } from './resources/searchresults';

const API_URL: string = 'http://localhost:8080';
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
    const customHeaders = (options.headers ||
        new Headers({
            Accept: 'application/json',
        })) as Headers;
    // customHeaders.set('Authorization', 'Basic ' + authHeader());
    options.headers = customHeaders;
    return fetchUtils.fetchJson(url, options);
};

// const myDataProvider = dataProvider('http://localhost:3000');
const myDataProvider = dataProvider(API_URL, httpClient);

const filters = [
    <TextField source="id" key={4} />,
    <TextInput
        label="Name"
        source="metadata.name"
        alwaysOn
        key={1}
        defaultValue=""
        parse={v => {
            if (!(v.startsWith('"') && v.endsWith('"'))) {
                v = `"${v}"`
            }
            return 'metadata.name:' + v
        }}
        format={v => v.split(':')[1].split('"')[0]}
    />,
    <TextInput
        label="Description"
        source="metadata.description"
        alwaysOn
        key={2}
        defaultValue=""
        parse={v => {
            if (!(v.startsWith('"') && v.endsWith('"'))) {
                v = `"${v}"`
            }
            return 'metadata.description:' + v
        }}
        format={v => v.split(':')[1].split('"')[0]}
    />,
    <TextInput
        label="Type"
        source="type"
        alwaysOn
        key={3}
        defaultValue=""
        parse={v => {
            if (!(v.startsWith('"') && v.endsWith('"'))) {
                v = `"${v}"`
            }
            return 'type:' + v
        }}
        format={v => v.split(':')[1].split('"')[0]}
    />,
]

const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <SearchBar hintText="Search" to="searchresults" filters={filters} filterSeparator=":"></SearchBar>
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
            <Search searchProvider={myDataProvider}>
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
                    {/* <Resource name="searchresults" list={SearchList} /> */}
                    <CustomRoutes>
                        <Route path="/searchresults" element={<SearchList />} />
                    </CustomRoutes>
                </Admin>
            </Search>
        </RootSelector>
    );
};

export default App;
