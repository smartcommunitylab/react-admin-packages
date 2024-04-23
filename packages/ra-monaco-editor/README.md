# React-Admin AceEditor

[![Version](https://img.shields.io/npm/v/@dslab/ra-monaco-editor.svg)](https://www.npmjs.com/package/@dslab/ra-monaco-editor)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-monaco-editor/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

React Monaco Editor input + field for React-Admin.

Add support for Monaco Editor [https://microsoft.github.io/monaco-editor/] via https://github.com/suren-atoyan/monaco-react

Exports:

-   **MonacoEditorField** for visualization
-   **MonacoEditorInput** for editing

## Install

```sh
yarn install @dslab/ra-monaco-editor
```

## Usage

Import the components from the library as needed.

#### MonacoEditorField

To use the field in a _show_ view include the component

```javascript
<MonacoEditorField defaultLanguage="javascript" defaultValue="// some comment" theme="vs-dark" />
```

![AceField screenshot](assets/field-screenshot.png)

#### AceEditorInput

To use the input in an _edit/create_ form include the component

```javascript
<MonacoEditorInput defaultLanguage="javascript" defaultValue="// some comment" theme="vs-dark" />
```

![MonacoInput screenshot](assets/input-screenshot.png)

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2024 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
