import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import {
    AuthorizationAwareAuthProvider,
    OidcConfiguration,
    UserStoreTypes,
} from './types';

/**
 * OpenID Connect authentication provider, with additional method to expose authentication headers
 */
export const OidcAuthProvider = (
    props: OidcConfiguration
): AuthorizationAwareAuthProvider => {
    const {
        issuer,
        clientId,
        scope = 'openid',
        loadUserInfo = true,
        store = UserStoreTypes.LocalStorage,
        redirectUrl = `${window.location.origin}/auth-callback`,
    } = props;
    //init store
    const storage =
        store === UserStoreTypes.LocalStorage
            ? window.localStorage
            : window.sessionStorage;

    //create user manager
    const userManager = new UserManager({
        authority: issuer,
        client_id: clientId,
        redirect_uri: redirectUrl,
        scope: scope,
        userStore: new WebStorageStateStore({ store: storage }),
        loadUserInfo: loadUserInfo,
        ...(props.issuerUrl && { metadataUrl: props.issuerUrl }),
        ...(props.display && { display: props.display }),
        ...(props.prompt && { prompt: props.prompt }),
    });

    return {
        getAuthorization: async () => {
            const user = await userManager.getUser();
            if (user) {
                return 'Bearer ' + user.access_token;
            }

            throw new Error('missing access token');
        },
        login: () => {
            return userManager.signinRedirect();
        },
        // when the dataProvider returns an error, check if this is an authentication error
        checkError: error => {
            const status = error.status;
            if (status === 401 || status === 403) {
                return Promise.reject();
            }
            // other error code (404, 500, etc): no need to log out
            return Promise.resolve();
        },
        // when the user navigates, make sure that their credentials are still valid
        checkAuth: async () => {
            const isAuthenticated = await userManager.getUser();
            return isAuthenticated ? Promise.resolve() : Promise.reject();
        },
        // remove local credentials and notify the auth server that the user logged out
        logout: () => {
            userManager.removeUser();
            return Promise.resolve();
        },
        // get the user's profile
        getIdentity: async () => {
            const user = await userManager.getUser();

            return Promise.resolve({
                id: user?.profile.sub ?? '',
                fullName: user?.profile.preferred_username,
            });
        },
        //TODO get the user permissions
        getPermissions: () => {
            return Promise.resolve();
        },
        handleCallback: async () => {
            // get an access token via user manager
            const user = await userManager.signinRedirectCallback();
            userManager.storeUser(user);
        },
    };
};

export default OidcAuthProvider;
