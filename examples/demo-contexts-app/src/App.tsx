import {
    Admin,
    Resource,
    AppBar,
    Layout,
    TitlePortal,
    TextInput,
    fetchUtils,
    CustomRoutes,
    CheckboxGroupInput,
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
import { SearchList } from './components/list';

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
    <CheckboxGroupInput source="type" choices={[
        { id: 'function', name: 'Function' },
        { id: 'dataitem', name: 'DataItem' },
        { id: 'artifact', name: 'Artifact' },
    ]}
        label="Type"
        key={1}
        defaultValue={[]}
        parse={v => {
            //v=['function', 'dataitem']
            //return type:(function OR dataitem)
            return `type:(${v.join(' OR ')})`
        }}
        format={v => {
            //v=type:(function OR dataitem)
            //return ['function', 'dataitem']
            const startIndex = v.indexOf('(')
            const endIndex = v.indexOf(')')
            return v.substring(startIndex + 1, endIndex).split(' OR ')
        }}
    />,
    <TextInput
        label="Name"
        source="metadata.name"
        alwaysOn
        key={2}
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
        key={3}
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
        label="Version"
        source="metadata.version"
        alwaysOn
        key={4}
        defaultValue=""
        parse={v => {
            if (!(v.startsWith('"') && v.endsWith('"'))) {
                v = `"${v}"`
            }
            return 'metadata.version:' + v
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
                    <CustomRoutes>
                        <Route path="/searchresults" element={<SearchList />} />
                    </CustomRoutes>
                </Admin>
            </Search>
        </RootSelector>
    );
};

export default App;
