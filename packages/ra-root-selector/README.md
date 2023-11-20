# React-Admin Menu Root Selector

[![Version](https://img.shields.io/npm/v/@dslab/ra-menu-root-selector.svg)](https://www.npmjs.com/package/@dslab/ra-menu-root-selector)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-menu-root-selector/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Menu switcher for React-admin
## Install

```sh
yarn install @dslab/ra-menu-root-selector
```
## Usage

The menu switcher component can be used wrapping the entire application inside the <RootResourceContext/> and defining some attributes like in the following code
```javascript
<RootResourceContext resource="domains" adminApp={<AdminApp />} initialApp={<InitialApp />} />
```
The attributes passed in the components are:
<ul>
  <li>resource: the name of the resource your application use as a context. The list will appear on the AppBar</li>
  <li>adminApp: the main application wrapped in the Admin component with the definition of the resources</li>
  <li>initialApp: the application that show the context list and that is the starting point of the entire app </li>
</ul>



## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
