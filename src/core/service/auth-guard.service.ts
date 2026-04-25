import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

// KeycloakService is still used internally but not subclassed → no "override" issues
export const authGuard: CanActivateFn = async (route, state) => {
    const keycloak = inject(KeycloakService);

    console.log('[AUTH GUARD] Checking login...');
    const isAuthenticated = await keycloak.isLoggedIn();
    console.log('[AUTH GUARD] isAuthenticated =', isAuthenticated);

    if (!isAuthenticated) {
        await keycloak.login({ redirectUri: window.location.origin + state.url });
        return false;
    }

    // Optionally restrict by roles
    // const userRoles = keycloak.getUserRoles();
    // const requiredRoles = route.data?.['roles'] as string[] | undefined;
    // if (requiredRoles && !requiredRoles.some(r => userRoles.includes(r))) {
    //   router.navigate(['/']);
    //   return false;
    // }

    return true;
};
