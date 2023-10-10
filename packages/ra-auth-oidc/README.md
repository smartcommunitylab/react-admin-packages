# React-Admin OIDC Authentication

[![Version](https://img.shields.io/npm/v/@dslab/ra-auth-oidc.svg)](https://www.npmjs.com/package/@dslab/ra-auth-oidc)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-auth-oidc/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

OpenID Connect authentication provider for React-Admin

## Install

```sh
yarn install @dslab/ra-auth-oidc
```

## Usage

Import the authentication provider and instantiate by providing the _config_

```javascript
import { OidcAuthProvider } from '@dslab/ra-auth-oidc';

const authProvider = OidcAuthProvider({
    clientId: 'clientId',
    issuer: 'https://ISSUER_URI',
});

const App = () => <Admin authProvider={authProvider} requireAuth></Admin>;
```

#### Login components

By default, the _react-admin_ app will include a login page linked to the `login()` action exposed by the authentication provider.

This library exports components optimized for the oidc login experience:

-   **LoginPage**
-   **LoginForm**
-   **LoginButton**

Import and use as needed to optimize the login.

```javascript
import { LoginPage } from '@dslab/ra-auth-oidc';

const myLoginPage = () => <LoginPage />;

const App = () => (
    <Admin
        loginPage={myLoginPage}
        authProvider={authProvider}
        requireAuth
    ></Admin>
);
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
