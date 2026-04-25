import { Component, computed, inject } from '@angular/core';
import { KeycloakApiService } from 'src/core/service/keycloak-api.service';
import { JsonPipe } from '@angular/common';
import { TruncatePipe } from '../../core/pipes/truncate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { KeycloakUser } from './models/interfaces';
import { RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { ContextMenuComponent } from 'src/shared/context-menu/context-menu.component';
import { UsersService } from 'src/core/service/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigService } from 'src/core/service/config.service';
@Component({
    selector: 'app-counter',
    imports: [
        TruncatePipe,
        MatIconModule,
        MatTableModule,
        RouterLink,
        NgComponentOutlet,
        MatProgressSpinnerModule,
        JsonPipe,
    ],
    templateUrl: './users-list.component.html',
})
export class UsersListComponent {
    private keycloakApiService = inject(KeycloakApiService);
    private usersService = inject(UsersService);
    public users = this.keycloakApiService.users;
    private configService = inject(ConfigService);
    contextMenuCmp = ContextMenuComponent;
    displayedColumns = ['id', 'firstName', 'lastName', 'email', 'action'];

    readonly dataSource = computed(
        () => (this.users.value() ?? []) as readonly KeycloakUser[],
    );

    constructor() {}

    reload() {
        this.keycloakApiService.refreshUsers();
    }
}
