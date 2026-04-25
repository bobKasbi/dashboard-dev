/*
import { inject, Injectable, signal } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

export interface UserFieldConfig {
    name: string;
    value: string | boolean;
    validators?: any[];
}

export interface KeycloakUser {
    id?: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    confirmPassword: string;
    enabled?: boolean;
    emailVerified?: boolean;
    // etc...
}

export type CreateUserForm = KeycloakUser & { password: string };

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private http = inject(HttpClient);
    private keycloak = inject(KeycloakService);

    private baseUrl = '/admin/realms/dashboard-dev';
    public userId = signal<string>(''); // 🔥 stays EXACTLY as you want

    addNewUser(form: Partial<CreateUserForm>) {
        if (!form.username || !form.email || !form.password) {
            throw new Error('Missing required fields');
        }

        const { password, ...user } = form;
        delete user.confirmPassword;

        return this.http.post(`${this.baseUrl}/users`, user).pipe(
            switchMap(() =>
                this.http.get<KeycloakUser[]>(
                    `${this.baseUrl}/users?username=${encodeURIComponent(form.username ?? '')}`,
                ),
            ),
            switchMap((res) => {
                this.userId.set(
                    res?.[0]?.id ??
                        (() => {
                            throw new Error(
                                `Failed to resolve ID after creating "${form.username}".`,
                            );
                        })(),
                );

                return this.http.put(
                    `${this.baseUrl}/users/${this.userId()}/reset-password`,
                    {
                        type: 'password',
                        value: password,
                        temporary: false,
                    },
                );
            }),
        );
    }
}
*/

import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ConfigService } from './config.service';

export interface UserFieldConfig {
    name: string;
    value: string | boolean;
    validators?: any[];
}

export interface KeycloakUser {
    id?: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    confirmPassword: string;
    enabled?: boolean;
    emailVerified?: boolean;
}

export type CreateUserForm = KeycloakUser & { password: string };

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private http = inject(HttpClient);
    private configService = inject(ConfigService);

    private baseUrl = computed(() => {
        const config = this.configService.config();

        if (!config) {
            return '';
        }

        return `${config.apiBaseUrl}/users`;
    });

    public userId = signal<string>('');

    addNewUser(form: Partial<CreateUserForm>) {
        const baseUrl = this.baseUrl();

        if (!baseUrl) {
            throw new Error('Runtime config not available');
        }

        if (!form.username || !form.email || !form.password) {
            throw new Error('Missing required fields');
        }

        const { password, ...user } = form;
        delete user.confirmPassword;

        return this.http.post(`${baseUrl}`, user).pipe(
            switchMap(() =>
                this.http.get<KeycloakUser[]>(
                    `${baseUrl}?username=${encodeURIComponent(form.username ?? '')}`,
                ),
            ),
            switchMap((res) => {
                const createdUser = res?.find(
                    (u) => u.username === form.username,
                );
                console.log('createdUser: ', createdUser);
                console.log('RES: ', res);

                this.userId.set(
                    createdUser?.id ??
                        (() => {
                            throw new Error(
                                `Failed to resolve ID for "${form.username}".`,
                            );
                        })(),
                );

                return this.http.put(
                    `${baseUrl}/${this.userId()}/reset-password`,
                    {
                        type: 'password',
                        value: password,
                        temporary: false,
                    },
                );
            }),
        );
    }
}
