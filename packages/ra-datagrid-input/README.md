# React-Admin Datagrid Input

[![Version](https://img.shields.io/npm/v/@dslab/ra-export-all-button.svg)](https://www.npmjs.com/package/@dslab/ra-export-all-button)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-all-button/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

The **Datagrid Input** is a React-Admin component that, along with other existing components, enables you to deal with relationships between records.
Using the **Datagrid** component, it allows the addition and/or removal of reference records (records belonging to a resource associated with the one undergoing creation or modification by a relationship).

It consists of a paginated and sortable datagrid with remove buttons for both single and bulk operations. The addition occurs through another datagrid contained in a dialog which, supporting sorting, filtering and pagination, displays all available records.

## Install

```sh
yarn install @dslab/ra-datagrid-input
```

## Usage

```javascript
import {
    Edit,
    SimpleForm,
    TextInput,
    ReferenceArrayInput,
    TextField,
} from 'react-admin';
import { DatagridInput } from '@dslab/ra-datagrid-input';

const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="post_title" />
            <ReferenceArrayInput source="tags_ids" reference="tags">
                <DatagridInput>
                    <TextField source="tag_name" />
                    <TextField source="tag_description" />
                </DatagridInput>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);
```

#### Props

The component accepts the following props:

| Prop                        | Required | Type           | Default                                                         | Description                                                                                                                                                                                                                             |
| --------------------------- | -------- | -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`                  | Optional | `ReactNode`    | `<RecordRepresentation />`                                      | The list of `<Field>` components to render as columns.                                                                                                                                                                                  |
| `dialogChildren`            | Optional | `ReactNode`    | children                                                        | The list of `<Field>` components to render as columns of the dialog's datagrid. E.g. `dialogChildren={<TextField source="tag_name" />}` or `dialogChildren={[<TextField source="tag_name" />, <TextField source="tag_description" />]}` |
| `sort`                      | Optional | `object`       | -                                                               | The initial sort parameters for both lists.                                                                                                                                                                                             |
| `dialogTitle`               | Optional | `string`       | 'ra.message.bulk_update_title' translation + resource's name | The title for the dialog.                                                                                                                                                                                                               |
| `dialogFilters`             | Optional | `ReactElement` | -                                                               | The filters to display in the toolbar of the dialog's list.                                                                                                                                                                             |
| `dialogFilter`              | Optional | `object`       | -                                                               | The permanent filter values of the dialog's list.                                                                                                                                                                                       |
| `dialogFilterDefaultValues` | Optional | `object`       | -                                                               | The default filter values of the dialog's list.                                                                                                                                                                                         |
| `dialogQueryOptions`        | Optional | `object`       | -                                                               | The options to pass to the `useQuery` hook of the dialog's list.                                                                                                                                                                        |

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
