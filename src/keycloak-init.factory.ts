import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return async () => {
        try {
            await keycloak.init({
                config: {
                    url: 'http://keycloak.app-auth.net',
                    realm: 'dashboard-ui',
                    clientId: 'dashboard-ui',
                },
                initOptions: {
                    onLoad: 'login-required',
                    checkLoginIframe: false,
                },
                bearerExcludedUrls: ['/assets', '/public'],
            });
        } catch (error) {
            console.error('Keycloak initialization failed', error);
        }
    };
}
