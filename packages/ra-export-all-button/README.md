# React-Admin Export All Button

[![Version](https://img.shields.io/npm/v/@dslab/ra-export-all-button.svg)](https://www.npmjs.com/package/@dslab/ra-export-all-button)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-all-button/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

The **Export All Button** for React-Admin exports the current list with filters, sorting, and pagination settings applied.

## Install

```sh
yarn install @dslab/ra-export-all-button
```

## Usage

```javascript
import { ExportAllButton } from '@dslab/ra-export-all-button';

const ListActions = () => (
    <TopToolbar>
        <ExportAllButton />
    </TopToolbar>
);

export const List = () => <List actions={<ListActions />}></List>;
```

#### Props

The button accepts the following props:

| Prop         | Required | Type           | Default             | Description                         |
| ------------ | -------- | -------------- | ------------------- | ----------------------------------- |
| `maxResults` | Optional | `number`       | 10000               | Maximum number of records to export |
| `perPage`    | Optional | `number`       | perPage of the list | Number of records in each request   |
| `label`      | Optional | `string`       | 'ra.action.export'  | Label or translation message to use |
| `icon`       | Optional | `ReactElement` | `<DownloadIcon>`    | iconElement, e.g. `<CommentIcon />` |
| `exporter`   | Optional | `Function`     | -                   | Override the List exporter function |
| `meta`       | Optional | `any`          | undefined           | Metadata passed to the dataProvider |

## Author

**SmartCommunityLab**
**React-admin**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
