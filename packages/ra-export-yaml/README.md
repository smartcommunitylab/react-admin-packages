# React-Admin `Yaml Export`` function

[![Version](https://img.shields.io/npm/v/@dslab/ra-delete-confirm.svg)](https://www.npmjs.com/package/@dslab/ra-export-yaml)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-export-yaml/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Export bulk list to Yaml file, 

## Install

```sh
yarn install @dslab/ra-export-yaml
```

## Usage

To use in an list context, where the records are available, include the component as exporter function inside <List>.

The list of optional parameters are


The list could be implemented like the following.

```javascript

export const AppList = () => {
    const params = useParams();
    const options = { meta: { realmId: params.realmId } };
    useListContext<any>();
    return (
        <>
            <List
                exporter={YamlExporter}
            >
                <Datagrid>
                    <TextField source="id" />
                    <ExportAppButton />
                </Datagrid>
            </List>
        </>
    );
};
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