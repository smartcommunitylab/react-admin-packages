# React-Admin Root Selector

[![Version](https://img.shields.io/npm/v/@dslab/ra-root-selector.svg)](https://www.npmjs.com/package/@dslab/ra-root-selector)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-root-selector/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Root context switcher for React-admin: use a _resource_ as root context for dependant resources.
Context is persisted in the URL, by leveraging the browser router and basename.

This component is not compatible with HashRouter.

## Install

```sh
yarn install @dslab/ra-root-selector
```

## Usage

To use the root switcher you need to wrap the admin application with the `<RootSelector>` and provide the identifier of the resource to be used as context.
The provider will patch the application, inject the selector and the context.

```javascript
const App = () => {
    return (
        <RootSelector resource="organizations">
            <Admin dataProvider={dataProvider} layout={MyLayout}>
                <Resource name="users" list={UserList} />
                <Resource name="organizations" />
            </Admin>
        </RootSelector>
    );
};
```

The component will inject into all the default _DataProvider_ methods an additional meta:property named `root` with the value matching the `id` of the resource currently selected as root context.

```javascript
meta = {
    root: '123',
};
```

It is up to application developers to leverage the value to obtain the desired behavior.
Example:

```javascript
getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        ...fetchUtils.flattenObject(params.filter),
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
    };

    //add org if specified in meta as root
    if (params.meta?.root) {
        query['organization'] = params.meta.root;
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(...);
},

```

### Options

The user can customize the options, and even replace the default selector with a custom one.
Options

```javascript

  /**
   * resource identifier to define the resource used as root context
   */
  resource: string;
  /**
   * React-Admin (like) child
   */
  children: ReactElement;
  /**
   * basename for routing
   */
  basename?: string;
  /**
   * path separator for context
   */
  separator?: string;
  /**
   * custom selector to be displayed in initial app for context selection
   */
  selector?: ReactElement | boolean;

  /**
   * source field (for resource) to be used as label
   */
  source?: string;

```

### Use a custom selector

A custom selector could leverage the components exported from this package as follows

```javascript
const Selector = props => {
    return (
        <List {...props}>
            <Datagrid rowClick={false} bulkActionButtons={false}>
                <TextField source="id" />
                <RootSelectorButton />
            </Datagrid>
        </List>
    );
};

const App = () => {
    return (
        <RootSelector resource="organizations" selector={<Selector />}>
            <Admin dataProvider={dataProvider} layout={MyLayout}>
                <Resource name="users" list={UserList} />
                <Resource name="organizations" />
            </Admin>
        </RootSelector>
    );
};
```

Do note that the component expects a _valid element_ as selector, otherwise it will switch back to the default one.

Developers can add _create/edit_ views on the selected resource as needed, and add links to the custom selector to enable end users to create or edit resources right from the initial view.

### Use the menu selector

The package exposes a component for quickly switching the root context via a dropdown menu, which can be added to the _app bar_.

```javascript
const MyAppBar = () => (
    <AppBar>
        <TitlePortal />
        <RootResourceSelectorMenu source="name" />
    </AppBar>
);
const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;
```

The menu is customizable via options.

```javascript
  /**
   * Name of the field to be used as label, defaults to 'id'
   */
  source?: string,
  /**
   * Maximum number of entries to show in the menu
   */
  maxResults?: number,
  /**
   * (Optional) sort criteria for data provider
   */
  sort?: SortPayload,
  /**
   * (Optional) filter criteria for data provider
   */
  filter?: any,
  /**
   * (Optional) meta properties for data provider
   */
  meta?: any,
  /**
   * (Optional) label for the menu, used when showSelected is false.
   * Defaults to the resource name
   */

  label?: string,
  /**
   * (Optional) custom icon for the menu.
   */

  icon?: ReactNode,
  /**
   * Show the selected resource as label for the menu, or
   * fall back to the configured label
   */

  showSelected?: boolean,

```

### Use the button

The component exports a switch button which can be used in any place to select a resource as root, by passing a `record` of the correct type.

```javascript
const record = useRecordContext();
return <RootSelectorButton resource="organizations" record={record} />;
```

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
