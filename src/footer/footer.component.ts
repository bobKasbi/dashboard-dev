import { Component, inject } from '@angular/core';
import { VersionService } from '../core/service/version.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
        <div class="app-footer fixed-bottom">build: {{ version() }}</div>
    `,
    styles: [
        `
            .app-footer {
                width: 100%;
                height: 80px;
                text-align: center;
                padding: 2rem 0.5rem 0.5rem 0.5rem;
                font-size: 0.85rem;
                color: var(--slate-600);
                background: var(--surface-50);
                border-top: 1px solid var(--outline-200);
                margin-top: 2rem;
                user-select: none;
                border: 1px solid green;
            }
        `,
    ],
})
export class FooterComponent {
    private readonly vs = inject(VersionService);
    readonly version = this.vs.version;
}
