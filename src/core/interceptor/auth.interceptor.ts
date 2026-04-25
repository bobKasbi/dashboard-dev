import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, switchMap } from 'rxjs';

export interface AuthTokenProvider {
    getToken(): Promise<string | null>;
}

@Injectable({ providedIn: 'root' })
export class KeycloakTokenProvider implements AuthTokenProvider {
    private readonly keycloak = inject(KeycloakService);

    async getToken(): Promise<string | null> {
        await this.keycloak.updateToken(30);
        return this.keycloak.getKeycloakInstance().token ?? null;
    }
}

export class AuthInterceptor implements HttpInterceptor {
    private readonly keycloak = inject(KeycloakService);

    private readonly tokenProvider = inject(KeycloakTokenProvider);

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // modify request here
        // return next.handle(req);
        return from(this.tokenProvider.getToken()).pipe(
            switchMap(() => {
                const token = this.keycloak.getKeycloakInstance().token;

                if (!token) return next.handle(req);

                const headers: Record<string, string> = {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                };

                // only add Content-Type when safe
                if (req.body && !(req.body instanceof FormData)) {
                    headers['Content-Type'] = 'application/json';
                }

                return next.handle(req.clone({ setHeaders: headers }));
            }),
        );
    }
}
