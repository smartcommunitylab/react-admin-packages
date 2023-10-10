# React-Admin Italian language

[![Version](https://img.shields.io/npm/v/@dslab/ra-italian-language.svg)](https://www.npmjs.com/package/@dslab/ra-italian-language)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/packages/ra-italian-language/README.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/smartcommunitylab/react-admin-packages/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE)

Italian language i18n for React-Admin

## Install

```sh
yarn install @dslab/ra-italian-language
```

## Usage

Import the language file and create a _polyglotI18nProvider_.

```javascript
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import italianMessages from '@dslab/ra-language-italian';

export const i18nProvider = polyglotI18nProvider(
    locale => (locale === 'it' ? italianMessages : englishMessages),

    'en', // default locale
    [
        { locale: 'en', name: 'English' },
        { locale: 'it', name: 'Italiano' },
    ]
);
```

To personalize or integrate the translation extend as needed.

```javascript
import italianMessages from '@dslab/ra-language-italian';

const messages = {
    ...italianMessages,
    custom: {
        example: 'Esempio',
    },
};

export default messages;
```

## Author

**SmartCommunityLab**

-   Website: http://www.smartcommunitylab.it/
-   Github: [@smartcommunitylab](https://github.com/smartcommunitylab)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [SmartCommunityLab](https://github.com/smartcommunitylab).<br />
This project is [MIT](https://github.com/smartcommunitylab/react-admin-packages/blob/master/LICENSE) licensed.
