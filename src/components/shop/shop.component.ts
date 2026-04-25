import {
    ChangeDetectionStrategy,
    Component,
    computed,
    EnvironmentInjector,
    inject,
    inputBinding,
    // resource,
    signal,
    viewChild,
    ViewContainerRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    MatCard,
    MatCardModule,
    MatCardTitleGroup,
} from '@angular/material/card';
import { ProductService } from '../../core/service/product.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Router } from '@angular/router';
// import { RuntimeConfig } from 'src/model/interfaces';
import { ConfigService } from 'src/core/service/config.service';
import { ActivityComponent } from 'src/layout/right-panel/activity/activity.component';
import { FiltersComponent } from 'src/layout/right-panel/filters/filters.component';

interface Products {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: object;
}

@Component({
    selector: 'app-shop',
    imports: [
        MatCard,
        MatCardModule,
        MatCardTitleGroup,
        MatCard,
        MatCardModule,
        PaginationComponent,
    ],
    providers: [],
    templateUrl: './shop.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
    private productService = inject(ProductService);
    private congiceService = inject(ConfigService);
    private router = inject(Router);
    public prodSignal = toSignal<Products[]>(this.productService.getProducts());
    public currentPage = signal(1);
    public configData = this.congiceService.config;

    environmentInjector = inject(EnvironmentInjector);

    // dynamic hosts: signal-based ViewContainerRefs
    activity = viewChild.required('activity', { read: ViewContainerRef });
    filters = viewChild.required('filters', { read: ViewContainerRef });

    widgetsReady = computed(() => {
        const activityContainer = this.activity();
        const filtersContainer = this.filters();

        if (activityContainer && activityContainer.length === 0) {
            activityContainer.createComponent(ActivityComponent, {
                bindings: [inputBinding('title', () => 'Activity')],
            });
        }

        if (filtersContainer && filtersContainer.length === 0) {
            filtersContainer.createComponent(FiltersComponent, {
                bindings: [inputBinding('title', () => 'Filters')],
            });
        }
    });

    prodDescription(id: string | undefined) {
        if (!id) return; // or show error, or ignore
        this.router.navigate(['product', id]);
    }

    public paginatedProducts = computed(() => {
        const products = this.prodSignal() ?? [];
        const page = this.currentPage();
        const size = 12;

        const start = (page - 1) * size;
        return products.slice(start, start + size);
    });

    public pageSummary = computed(() => {
        const products = this.prodSignal() ?? [];
        const total = products.length;
        const page = this.currentPage();
        const size = 12;

        if (total === 0) return 'No products available';

        const start = (page - 1) * size + 1;
        const end = Math.min(start + size - 1, total);

        return `Showing ${start}–${end} of ${total} products`;
    });
}
