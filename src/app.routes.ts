import { ResolveFn, Routes } from '@angular/router';
import { authGuard } from './core/service/auth-guard.service';
import { inject } from '@angular/core';
import { KeycloakApiService } from './core/service/keycloak-api.service';

const usersResolver: ResolveFn<void> = () => {
    const api = inject(KeycloakApiService);
    return api.refreshUsers();
};

export const routes: Routes = [
    {
        path: '',
        redirectTo: () => Promise.resolve('shop'),
        pathMatch: 'full',
    },

    {
        path: 'shop',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/shop/shop.component').then(
                (c) => c.ShopComponent,
            ),
    },
    {
        path: 'product/:id',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/product/product.component').then(
                (c) => c.ProductComponent,
            ),
    },
    {
        path: 'appointments',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/appointments/custom-table-page.component').then(
                (m) => m.CustomTablePageComponent,
            ),
    },
    {
        path: 'appointments-signal',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/appointments-signal/custom-table-page.component').then(
                (m) => m.CustomTablePageComponent,
            ),
    },
    {
        path: 'todo',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./tasks/todo/todo-list.component').then(
                (m) => m.TodoListComponent,
            ),
    },
    {
        path: 'count',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./tasks/counter/counter.component').then(
                (m) => m.CounterComponent,
            ),
    },
    {
        path: 'users',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/users/users-list.component').then(
                (m) => m.UsersListComponent,
            ),
        resolve: { users: usersResolver },
    },
    {
        path: 'register',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/users/add-user/add-user.component').then(
                (m) => m.AddUserComponnent,
            ),
    },
    {
        path: 'hydration',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./tasks/hydration/hydration-case.component').then(
                (m) => m.HydrationCaseComponent,
            ),
    },
    {
        path: 'profile/:id',
        canMatch: [authGuard],
        loadComponent: () =>
            import('./components/users/profile/profile.component').then(
                (m) => m.ProfileComponent,
            ),
    },
];
