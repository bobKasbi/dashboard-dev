import { Component, computed, effect, input, signal, inject } from '@angular/core';
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableHeadComponent } from './table-head.component';

export interface TableColumn {
    label: string;
    key: string;
}

export interface RowData {
    id: number | string;
    date: string | Date;
    time: string;
    therapist: string;
    status: string;
    [key: string]: unknown; // <-- Add this, nothing else
}

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss'],
    imports: [CommonModule, FormsModule, TableHeadComponent],
})
export class CustomTableComponent {
    private readonly paginationService = inject<PaginationService<RowData>>(PaginationService);

    readonly data = input<RowData[]>([]);

    readonly columns = input<TableColumn[]>([]);
    readonly pageSizeOptions = input<number[]>([3, 5, 10]);
    readonly initialPageSize = input<number>(5);

    readonly pageSize = signal(this.initialPageSize());
    readonly paginatedData = computed(() => {
        this.paginationService.setPageSize(this.pageSize());
        this.paginationService.setData([...this.sortedData()]);
        return this.paginationService.getPageData();
    });

    readonly #sortKey = signal('');
    readonly #sortDirection = signal<'asc' | 'desc'>('asc');

    readonly sortKeyValue = computed(() => this.#sortKey());
    readonly sortDirectionValue = computed(() => this.#sortDirection());
    readonly pageSizeValue = computed(() => this.pageSize());
    readonly colCount = computed(() => 4);

    readonly sortedData = computed(() => {
        const data = [...this.data()];
        const key = this.#sortKey();
        const direction = this.#sortDirection();
        if (!key) return data;

        return data.sort((a, b) => {
            const valA = a[key];
            const valB = b[key];

            // auto-normalize values into a comparable form
            const A = typeof valA === 'string' ? valA : String(valA);
            const B = typeof valB === 'string' ? valB : String(valB);

            return A.localeCompare(B) * (direction === 'asc' ? 1 : -1);
        });
    });

    readonly paginationRange = computed(() => {
        void this.sortedData(); // track changes
        return this.paginationService.getPaginationRange();
    });

    constructor() {
        effect(
            () => {
                const sorted = this.sortedData();
                const size = this.pageSize();
                if (!sorted.length) return;

                this.paginationService.setPageSize(size);
                this.paginationService.setData([...sorted]);
            },
            { allowSignalWrites: true },
        );
    }

    nextPage(): void {
        this.paginationService.nextPage();
        // this.#updatePaginatedData();
    }

    prevPage(): void {
        this.paginationService.prevPage();
        // this.#updatePaginatedData();
    }

    goToPage(page: number): void {
        this.paginationService.goToPage(page);
        // this.#updatePaginatedData();
    }

    onPageSizeChange(): void {
        this.paginationService.setPageSize(this.pageSize());
        // this.#updatePaginatedData();
    }

    setPageSizeValue(value: number): void {
        this.pageSize.set(value);
        this.onPageSizeChange();
    }

    get currentPage(): number {
        return this.paginationService.getCurrentPage();
    }

    get totalPages(): number {
        return this.paginationService.getTotalPages();
    }

    onAction(row: Record<string, unknown>): void {
        console.log('Action button clicked for:', row);
    }

    sortBy(key: string): void {
        if (this.#sortKey() === key) {
            this.#sortDirection.set(this.#sortDirection() === 'asc' ? 'desc' : 'asc');
        } else {
            this.#sortKey.set(key);
            this.#sortDirection.set('asc');
        }
    }

    // #updatePaginatedData removed – now handled declaratively
}
