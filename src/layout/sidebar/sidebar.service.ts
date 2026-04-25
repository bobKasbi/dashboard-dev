import { Injectable, signal, computed } from '@angular/core';

type State = {
    expanded: boolean;
    mobileOpen: boolean;
};

@Injectable({ providedIn: 'root' })
export class SidebarService {
    readonly sideBarState = signal<State>({
        expanded: true,
        mobileOpen: false,
    });

    readonly status = {
        expanded: computed(() => this.sideBarState().expanded),
        mobile: computed(() => this.sideBarState().mobileOpen),
    };

    closeMobile(): void {
        this.sideBarState.update((s) => ({ ...s, mobileOpen: false }));
    }
}
