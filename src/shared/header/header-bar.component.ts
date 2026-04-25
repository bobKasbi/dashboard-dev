import { Component, inject } from '@angular/core';
import { CartService } from '../../core/service/cart.service';
import { RouterLink, RouterModule } from '@angular/router';
import { SidebarService } from 'src/layout/sidebar/sidebar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.scss'],
    imports: [RouterModule, RouterLink, FontAwesomeModule],
})
export class HeaderBarComponent {
    protected readonly faMenu = faBars;

    private readonly cartService = inject(CartService);
    readonly sidebar = inject(SidebarService);

    items = this.cartService.getItems();

    // reference only (NOT called in view)
    readonly toggleExpanded = () =>
        this.sidebar.sideBarState.update((s) => ({
            ...s,
            expanded: !s.expanded,
        }));
}
