import { AuthProvider } from 'ra-core';

// oidc configuration
export interface OidcConfiguration {
    clientId: string;
    issuer: string;
    redirectUrl?: string;
    issuerUrl?: string;
    scope?: string;
    prompt?: string;
    display?: string;
    loadUserInfo?: boolean;
    store?: UserStoreTypes;
}

export enum UserStoreTypes {
    LocalStorage,
    SessionStorage,
}

// extended auth provider which exposes an authorization header
export type AuthorizationAwareAuthProvider = AuthProvider & {
    getAuthorization: () => Promise<void | false | string>;
};
