# React Admin Dialog Crud

[![Version](https://img.shields.io/npm/v/@dslab/ra-export-all-button.svg)](https://www.npmjs.com/package/@dslab/ra-export-all-button)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-all-button/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

This package contains three components, each respectively designed to display, create, and edit content within a dialog.

## Install

```sh
yarn install @dslab/ra-dialog-crud
```

## React Admin Show in Dialog Button

This React Admin component renders a button opening a `<Show>` view inside a dialog, hence allowing to show a record without leaving the current view.

### Usage

```javascript
import { ShowInDialogButton } from '@dslab/ra-dialog-crud';
import {
    Datagrid,
    EmailField,
    List,
    SimpleShowLayout,
    TextField,
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />

            <ShowInDialogButton>
                <SimpleShowLayout>
                    <TextField source="first_name" />
                    <TextField source="last_name" />
                    <TextField source="email" />
                </SimpleShowLayout>
            </ShowInDialogButton>
        </Datagrid>
    </List>
);
```

#### Props

The component accepts the following props:

| Prop                    | Required | Type                       | Default | Description                                                                |
| ----------------------- | -------- | -------------------------- | ------- | -------------------------------------------------------------------------- |
| `children`              | Required | `ReactNode`                |         | The content of the dialog                                                  |
| `title`                 | Optional | `string` or `ReactElement` |         | The title of the dialog                                                    |
| `maxWidth`              | Optional | `string`                   | sm      | The max width of the dialog                                                |
| `fullWidth`             | Optional | `boolean`                  | `false` | If `true`, the dialog stretches to the full width of the screen            |
| `resource`              | Optional | `string`                   |         | The resource name                                                          |
| `label`                 | Optional | `string`                   |         | Allows to override the default button label. I18N is supported             |
| `id`                    | Optional | `string` or `number`       |         | The record id. If not provided, it will be deduced from the record context |
| `queryOptions`          | Optional | `object`                   |         | Options for the `dataProvider.getOne()` call                               |
| `disableAuthentication` | Optional | `boolean`                  |         | Set to `true` to disable the authentication check                          |
| `emptyWhileLoading`     | Optional | `boolean`                  |         | Set to `true` to show a loading indicator while the list is loading        |
| `sx`                    | Optional | `object`                   |         | Override the styles applied to the dialog component                        |

## React Admin Create in Dialog Button

This React Admin component offers a way to open a `<Create>` view inside a dialog, hence allowing to create a new record without leaving the current view.

### Usage

```javascript
import { CreateInDialogButton } from '@dslab/ra-dialog-crud';
import {
    Datagrid,
    EmailField,
    List,
    SimpleForm,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <CreateInDialogButton>
            <SimpleForm>
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <TextInput source="email" />
            </SimpleForm>
        </CreateInDialogButton>
    </TopToolbar>
);

export const UserList = () => (
    <List actions={<ListActions />}>
        <Datagrid>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);
```

#### Props

The component accepts the following props:

| Prop                    | Required | Type                       | Default | Description                                                                                                                   |
| ----------------------- | -------- | -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `children`              | Required | `ReactNode`                |         | The content of the dialog                                                                                                     |
| `title`                 | Optional | `string` or `ReactElement` |         | The title of the dialog                                                                                                       |
| `maxWidth`              | Optional | `string`                   | sm      | The max width of the dialog                                                                                                   |
| `fullWidth`             | Optional | `boolean`                  | `false` | If `true`, the dialog stretches to the full width of the screen                                                               |
| `resource`              | Optional | `string`                   |         | The resource name                                                                                                             |
| `label`                 | Optional | `string`                   |         | Allows to override the default button label. I18N is supported                                                                |
| `mutationOptions`       | Optional | `object`                   |         | Options for the `dataProvider.create()` call                                                                                  |
| `disableAuthentication` | Optional | `boolean`                  |         | Set to `true` to disable the authentication check                                                                             |
| `transform`             | Optional | `function`                 |         | Allows to transform a record after the user has submitted the form but before the record is passed to `dataProvider.create()` |
| `record`                | Optional | `object`                   |         | Allows to initialize the form with non-empty values                                                                           |
| `sx`                    | Optional | `object`                   |         | Override the styles applied to the dialog component                                                                           |

## React Admin Edit in Dialog Button

This React Admin component renders a button opening an `<Edit>` view inside a dialog, hence allowing to edit a record without leaving the current view.

### Usage

```javascript
import { EditInDialogButton } from '@dslab/ra-dialog-crud';
import {
    Datagrid,
    EmailField,
    List,
    SimpleForm,
    TextField,
    TextInput,
} from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />

            <EditInDialogButton>
                <SimpleForm>
                    <TextInput source="first_name" />
                    <TextInput source="last_name" />
                    <TextInput source="email" />
                </SimpleForm>
            </EditInDialogButton>
        </Datagrid>
    </List>
);
```

#### Props

The component accepts the following props:

| Prop                    | Required | Type                       | Default    | Description                                                                                                                                                                              |
| ----------------------- | -------- | -------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`              | Required | `ReactNode`                |            | The content of the dialog                                                                                                                                                                |
| `title`                 | Optional | `string` or `ReactElement` |            | The title of the dialog                                                                                                                                                                  |
| `maxWidth`              | Optional | `string`                   | sm         | The max width of the dialog                                                                                                                                                              |
| `fullWidth`             | Optional | `boolean`                  | `false`    | If `true`, the dialog stretches to the full width of the screen                                                                                                                          |
| `resource`              | Optional | `string`                   |            | The resource name                                                                                                                                                                        |
| `label`                 | Optional | `string`                   |            | Allows to override the default button label. I18N is supported                                                                                                                           |
| `queryOptions`          | Optional | `object`                   |            | Options for the `dataProvider.getOne()` call                                                                                                                                             |
| `mutationOptions`       | Optional | `object`                   |            | Options for the `dataProvider.update()` call                                                                                                                                             |
| `mutationMode`          | Optional | `string`                   | `undoable` | The mode that determines when the side effects (redirection, notifications, etc.) are executed. React-admin offers three modes for mutations: `pessimistic`, `optimistic` and `undoable` |
| `id`                    | Optional | `string` or `number`       |            | The record id. If not provided, it will be deduced from the record context                                                                                                               |
| `disableAuthentication` | Optional | `boolean`                  |            | Set to `true` to disable the authentication check                                                                                                                                        |
| `transform`             | Optional | `function`                 |            | Allows to transform a record after the user has submitted the form but before the record is passed to `dataProvider.update()`                                                            |
| `emptyWhileLoading`     | Optional | `boolean`                  |            | Set to `true` to show a loading indicator while the list is loading                                                                                                                      |
| `sx`                    | Optional | `object`                   |            | Override the styles applied to the dialog component                                                                                                                                      |

## Author

**SmartCommunityLab**

-   Website: [http://www.smartcommunitylab.it/](http://www.smartcommunitylab.it/)
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
