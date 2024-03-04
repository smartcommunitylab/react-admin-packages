# React-Admin Searchbar

TODO

## Install

```sh
yarn install @dslab/ra-search-bar
```

## Usage

To use the searchbar you need to wrap the admin application with `<Search>` and provide a data provider that is also a `SearchProvider`, i.e., that implements the `search` method. Then the `SearchContext` will be available to the application components.

The `<SearchBar>` component can be included in your application `<AppBar>`.

Example:

```javascript
const MyAppBar = () => (
    <AppBar color="primary">
        <TitlePortal />
        <SearchBar hintText="Search" to="searchresults"></SearchBar>
        <RootResourceSelectorMenu source="name" showSelected={false} />
    </AppBar>
);

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const App = () => {
    return (
        <Search searchProvider={myDataProvider}>
            <Admin dataProvider={myDataProvider} layout={MyLayout}>
                <Resource name="users" list={UserList} />
                <Resource name="organizations" />
            </Admin>
        </Search>
    );
};
```

The `search` method receives a `SearchParams` argument which holds the current search criteria.

Example:

```javascript
search: (params: SearchParams, resource): Promise<SearchResults> => {
    const q = params.q ? `q=${encodeURIComponent(params.q)}` : '';
    const fq = params.fq?.map((filter: SearchFilter) => `fq=${encodeURIComponent(filter.filter)}`).join('&');

    return httpClient(`${apiUrl}/api/v1/solr/search/item?${[q,fq].filter(Boolean).join('&')}`, {
        method: 'GET',
    }).then(...)
}
```

### Options

TODO with example filter array
