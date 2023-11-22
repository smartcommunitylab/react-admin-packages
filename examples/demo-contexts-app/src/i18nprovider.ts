import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import italianMessages from '@dslab/ra-language-italian';

const customItalian = {
    ...italianMessages,
    resources: {
        users: {
            fields: {
                name: 'Nome utente',
                address: {
                    city: 'Citta',
                    zipcode: 'CAP',
                },
            },
        },
    },
};

const customEnglish = {
    ...englishMessages,
    resources: {
        users: {
            fields: {
                name: 'Nome utente',
                address: {
                    city: 'City',
                    zipcode: 'ZIP code',
                },
            },
        },
    },
};

export const i18nProvider = polyglotI18nProvider(
    locale => (locale === 'it' ? customItalian : customEnglish),

    'en', // default locale
    [
        { locale: 'en', name: 'English' },
        { locale: 'it', name: 'Italiano' },
    ],
    { allowMissing: true }
);
