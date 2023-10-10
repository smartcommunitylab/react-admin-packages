# React-Admin Spring Data Rest

[![Version](https://img.shields.io/npm/v/@dslab/ra-data-spring-rest.svg)](https://www.npmjs.com/package/@dslab/ra-data-spring-rest)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-data-spring-rest/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Spring REST data provider for React-Admin

## Install

```sh
yarn install @dslab/ra-data-spring-rest
```

## Usage

To use the provider import and instantiate by passing the base _apiUrl (required)_ and an _httpClient (optional)_.

```javascript
import springDataProvider from 'ra-data-spring-rest';

const dataProvider = springDataProvider('https://jsonplaceholder.typicode.com');

const App = () => <Admin dataProvider={dataProvider}></Admin>;
```

To add authorization headers provide a custom httpClient to the provider.

```javascript
export const httpClientFactory = (): ((
    url: any,
    options?: fetchUtils.Options | undefined
) => Promise<{
    status: number,
    headers: Headers,
    body: string,
    json: any,
}>) => {
    return async (url: string, options: fetchUtils.Options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        if (!options.headers.has('Accept')) {
            options.headers.set('Accept', 'application/json');
        }

        const authHeader = 'Bearer TOKEN';
        if (authHeader) {
            options.headers.set('Authorization', authHeader);
        }

        return fetchUtils.fetchJson(url, options);
    };
};

const dataProvider = springDataProvider(
    'https://jsonplaceholder.typicode.com',
    httpClientFactory()
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
