import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [],
    template: `
        <nav class="d-flex justify-content-center my-4 w-100" aria-label="Pagination">
            <ul class="pagination mb-0">
                @for (item of paginationItems(); track item.type + item.label) {
                    <li class="page-item" [class.active]="item.active" [class.disabled]="item.disabled">
                        <button class="page-link" (click)="goTo(item.page)" [attr.aria-disabled]="item.disabled">
                            {{ item.label }}
                        </button>
                    </li>
                }
            </ul>
        </nav>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
    // required total count from parent
    public totalItems = input.required<number>();

    // configurable page size (defaults to 12)
    public pageSize = input<number>(12);

    // two-way signal model for the current page (1-based)
    public page = model<number>(1);

    public totalPages = () => Math.ceil(this.totalItems() / this.pageSize());

    public pages = () => {
        const total = this.totalPages();
        return Array.from({ length: total }, (_, i) => i + 1);
    };

    public goTo = (p: number) => {
        if (p < 1 || p > this.totalPages()) return;
        this.page.set(p);
    };

    public paginationItems = computed(() => {
        const cur = this.page();
        const last = this.totalPages();

        return [
            { type: 'first', label: '«', page: 1, disabled: cur === 1, active: false },
            { type: 'prev', label: '‹', page: cur - 1, disabled: cur === 1, active: false },

            ...this.pages().map((p) => ({
                type: 'page',
                label: String(p),
                page: p,
                disabled: false,
                active: p === cur,
            })),

            { type: 'next', label: '›', page: cur + 1, disabled: cur === last, active: false },
            { type: 'last', label: '»', page: last, disabled: cur === last, active: false },
        ];
    });
}
