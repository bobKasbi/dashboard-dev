import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-hydration-test',
    template: `
        <p>Server time: {{ serverTime }}</p>

        @defer {
            <p>Client time: {{ now() }}</p>
        } @placeholder {
            <p>Loading client time…</p>
        }
    `,
})
export class HydrationCaseComponent {
    serverTime = new Date().toISOString();
    now = signal(new Date().toISOString());
    constructor() {
        setInterval(() => {
            this.now.set(new Date().toISOString());
        }, 1000);
    }
}
