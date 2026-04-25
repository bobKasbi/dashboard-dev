import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { KeycloakService } from 'keycloak-angular';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthInterceptor,
                {
                    provide: KeycloakService,
                    useValue: {
                        updateToken: () => Promise.resolve(true),
                        getKeycloakInstance: () => ({ token: 'fake-token' }),
                    },
                },
            ],
        });
        interceptor = TestBed.inject(AuthInterceptor);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });
});
