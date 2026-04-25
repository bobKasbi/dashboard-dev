import { Injectable, computed, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ConfigService } from './config.service';

export type KeycloakUser = {
    id: string;
    username: string;
    email: string;
} & {
    [key: string]: unknown;
};

@Injectable({ providedIn: 'root' })
export class KeycloakApiService {
    private keycloak = inject(KeycloakService);
    private configService = inject(ConfigService);

    private reloadUsers = signal(0);

    private baseUrl = computed(
        () => this.configService.config()?.apiBaseUrl ?? '',
    );

    users = httpResource<KeycloakUser[]>(() => {
        this.reloadUsers();

        const kc = this.keycloak.getKeycloakInstance();
        const baseUrl = this.baseUrl();

        if (!kc.token || !baseUrl) {
            return undefined;
        }

        return {
            url: `${baseUrl}/users?first=0&max=50`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${kc.token}`,
            },
            responseType: 'json',
        };
    });

    async refreshUsers() {
        const kc = this.keycloak.getKeycloakInstance();
        await kc.updateToken(30);
        this.reloadUsers.update((v) => v + 1);
    }
}
