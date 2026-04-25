import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { SidebarService } from './layout/sidebar/sidebar.service';
import { HeaderBarComponent } from './shared/header/header-bar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FooterComponent, SidebarComponent, HeaderBarComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    readonly sidebar = inject(SidebarService);

    readonly closeMobile = () => this.sidebar.closeMobile(); // still fine, used for overlay if you keep it
}
