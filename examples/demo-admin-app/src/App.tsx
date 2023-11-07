import { Admin, Resource, ListGuesser } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';

import jsonServerProvider from 'ra-data-json-server';
import { i18nProvider } from './i18nprovider';
import { UserEdit } from './resources/users/edit';
import { PostEdit, PostList } from './resources/posts';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
    <BrowserRouter>
        <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
            <Resource name="posts" list={PostList} edit={PostEdit} />
            <Resource name="comments" list={ListGuesser} />
            <Resource name="users" list={ListGuesser} edit={UserEdit} />
        </Admin>
    </BrowserRouter>
);

export default App;
