import {
    APP_INITIALIZER,
    ApplicationConfig,
    importProvidersFrom,
    provideZonelessChangeDetection,
    inject,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { ConfigService } from './core/service/config.service';

async function initializeApp(
    configService: ConfigService,
    keycloak: KeycloakService,
): Promise<void> {
    await configService.load();

    const runtimeConfig = configService.config();

    if (!runtimeConfig) {
        throw new Error('Runtime config not available');
    }

    await keycloak.init({
        config: {
            url: runtimeConfig.auth.authority,
            realm: runtimeConfig.auth.realm,
            clientId: runtimeConfig.auth.clientId,
        },
        initOptions: {
            onLoad: runtimeConfig.auth.enabled ? 'login-required' : 'check-sso',
            checkLoginIframe: false,
        },
    });
}

const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        importProvidersFrom(KeycloakAngularModule),
        importProvidersFrom(
            ToastrModule.forRoot({
                timeOut: 4000,
                positionClass: 'toast-bottom-right',
                preventDuplicates: true,
            }),
        ),
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withInterceptorsFromDi()),
        provideZonelessChangeDetection(),
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const configService = inject(ConfigService);
                const keycloak = inject(KeycloakService);
                return () => initializeApp(configService, keycloak);
            },
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
};

bootstrapApplication(AppComponent, appConfig).catch(console.error);
