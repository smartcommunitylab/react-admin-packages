# React-Admin Export record button

[![Version](https://img.shields.io/npm/v/@dslab/ra-export-record-button.svg)](https://www.npmjs.com/package/@dslab/ra-export-record-button)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-record-button/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Export a single record as _source_ representation in a downloadable file.

## Install

```sh
yarn install @dslab/ra-export-record-button
```

### Usage

The `ExportRecordButton` shoud be placed in a record context to export as a downloadable file the current record. By default it supportes `json` or `yaml` as languages, but users can provide a custom `Exporter` to implement additional representations or introduce custom behavior.

Base usage, for example in a _Show_ view:

```javascript
import { ExportRecordButton } from '@dslab/ra-export-record-button';

const ShowActions = () => (
    <TopToolbar>
        <ExportRecordButton language="yaml" />
    </TopToolbar>
);
```

### Options

The button accepts all the standard _ButtonProps_ for customization plus options to alter the configuration.

```javascript
    /**
     * (Optional) language for export. Defaults to `json`
     */
    language?: 'json' | 'yaml';
    /**
     * (Optional) exporter to override the internal one.
     */
    exporter?: Exporter;
    /**
     * (Optional) Custom icon for the button
     */
    icon?: ReactElement;
    /**
     * (Optional) record object to use in place of the context
     */
    record?: RecordType;
    /**
     * (Optional) resource identifier to use in place of the context
     */
    resource?: string;
    /**
     * (Optional) filename to use for export. Defaults to `[resource]-[id]`
     */
    filename?: string;

```

### Using a custom exporter

The user can provide a custom exporter by implementing the standard _react-admin_ interface `Exporter`. Keep in mind that the default exporter works on _lists_, so if you use _fetchRelatedRecords_ or other utilities you will have to extract a single record at the end to populate the download's content.

The following examples shows how to collect additional related records and embed their value inside the current record for exporting a fully hydrated representation.

```javascript
import {
    ExportRecordButton,
    toYaml,
    downloadYaml,
} from '@dslab/ra-export-record-button';

const recordExporter: Exporter = (
    data,
    fetchRelatedRecords,
    dataProvider,
    resource
) => {
    fetchRelatedRecords(data, 'userId', 'users').then(users => {
        const res = data.map(record => ({
            ...record,
            username: users[record.userId].username,
            user: users[record.userId],
        }));

        //single record, list should contain 1 element
        //pick first or exit
        const r = res && res.length > 0 ? res[0] : null;
        if (r) {
            downloadYaml(toYaml(r, resource), `${resource}_${r.id}`);
        }
    });
};

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
            <ExportRecordButton exporter={recordExporter} />
        </Datagrid>
    </List>
);
```

All the utilities for:

-   exporting to _json_ or _yaml_
-   downloading a _json_ or _yaml_ string as a file

are exported from the package and available for custom usage.

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
