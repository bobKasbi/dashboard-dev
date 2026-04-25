import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { VersionService } from 'src/core/service/version.service';

export interface SidebarLink {
    link: string;
    linkText: string;
    icon?: string; // optional future fields
    children?: SidebarLink[]; // recursive, flexible
}

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.scss'],
    imports: [RouterLink, RouterLinkActive],
    styles: [
        `
            :host {
                display: block;
            }
            .nav-link {
                color: #333;
            }
            .nav-link.active {
                background-color: #4b8ef2ff;
            }
        `,
    ],
})
export class SidebarComponent {
    private readonly sideBar = inject(SidebarService);
    private readonly versionService = inject(VersionService);

    readonly version = this.versionService.version;
    // template reads only through computeds
    readonly status = this.sideBar.status;
    readonly sideBarLinks = [
        { link: '/shop', linkText: 'Shop', icon: '🛍️' },
        { link: '/appointments', linkText: 'Appointments', icon: '📅' },
        {
            link: '/appointments-signal',
            linkText: 'Signal Appointments',
            icon: '⚡',
        },
        { link: '/todo', linkText: 'Todo Lists', icon: '⚡' },
        { link: '/count', linkText: 'Counting', icon: '⚡' },
        { link: '/hydration', linkText: 'Hydration', icon: '⚡' },
        { link: '/users', linkText: 'Users', icon: '⚡' },
        // { link: '/profile', linkText: 'Profile', icon: '⚡' },
    ] as const satisfies ReadonlyArray<SidebarLink>;
}
