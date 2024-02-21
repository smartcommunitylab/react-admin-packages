# React Admin Dialog Crud

[![Version](https://img.shields.io/npm/v/@dslab/ra-export-all-button.svg)](https://www.npmjs.com/package/@dslab/ra-export-all-button)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-all-button/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

## Install

```sh
yarn install @dslab/ra-dialog-crud
```

## React Admin Show in Dialog Button

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

| Prop                    | Required | Type        | Default | Description                                                                                                                   |
| ----------------------- | -------- | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `children`              | Required | `ReactNode` |         | The content of the dialog                                                                                                     |
| `dialogTitle`           | Optional | `string`    |         | The title of the dialog                                                                                                       |
| `maxWidth`              | Optional | `string`    | sm      | The max width of the dialog                                                                                                   |
| `fullWidth`             | Optional | `boolean`   | `false` | If `true`, the dialog stretches to the full width of the screen                                                               |
| `resource`              | Optional | `string`    |         | The resource name                                                                                                             |
| `label`                 | Optional | `string`    |         | Allows to override the default button label. I18N is supported                                                                |
| `mutationOptions`       | Optional | `object`    |         | Options for the `dataProvider.create()` call                                                                                  |
| `disableAuthentication` | Optional | `boolean`   |         | Disable the authentication check                                                                                              |
| `transform`             | Optional | `function`  |         | Allows to transform a record after the user has submitted the form but before the record is passed to `dataProvider.create()` |

## React Admin Edit in Dialog Button

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
