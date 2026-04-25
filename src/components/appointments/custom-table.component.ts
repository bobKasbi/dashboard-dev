import { Component, OnChanges, SimpleChanges, Input, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableHeadComponent } from './table-head.component';

export interface TableColumn {
    label: string;
    key: string;
}

export interface TableRow {
    id: number | string;
    date: string | Date;
    time: string;
    therapist: string;
    status: string;
    [key: string]: unknown;
}

@Component({
    selector: 'app-custom-table',
    templateUrl: './custom-table.component.html',
    styleUrls: ['./custom-table.component.scss'],
    imports: [CommonModule, FormsModule, TableHeadComponent],
})
export class CustomTableComponent implements OnChanges, OnInit {
    private paginationService = inject<PaginationService<TableRow>>(PaginationService);

    private cdRef = inject(ChangeDetectorRef);

    @Input() public data: TableRow[] = [];
    @Input() public columns: TableColumn[] = [];
    public pageSizeOptions = [3, 5, 10];
    public pageSize = 5;
    public readonly DEFAULT_COL_COUNT = 4;

    #sortKey = 'date'; // Default sorting column
    #sortDirection: 'asc' | 'desc' = 'asc';

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['columns']) {
            this.updatePagination();
        }
    }

    ngOnInit(): void {
        this.updatePagination();
    }

    private updatePagination(): void {
        this.paginationService.setData(this.data);
        this.paginationService.setPageSize(this.pageSize);
        this.cdRef.detectChanges(); // Manually trigger change detection
    }

    // Pagination controls
    nextPage(): void {
        this.paginationService.nextPage(); // Move to the next page
        this.refreshTableData(); // Recalculate paginated data
    }

    prevPage(): void {
        this.paginationService.prevPage(); // Move to the previous page
        this.refreshTableData(); // Recalculate paginated data
    }

    goToPage(page: number): void {
        this.paginationService.goToPage(page); // Go to the specific page
        this.refreshTableData(); // Recalculate paginated data
    }

    onPageSizeChange(): void {
        this.paginationService.setPageSize(this.pageSize); // Update page size
        this.refreshTableData(); // Recalculate paginated data
    }

    setPageSizeValue(value: number): void {
        this.pageSize = value;
        this.onPageSizeChange();
    }

    get currentPage(): number {
        return this.paginationService.getCurrentPage();
    }

    get totalPages(): number {
        return this.paginationService.getTotalPages();
    }

    // Getter for sorting key and direction
    get sortKeyValue(): string {
        return this.#sortKey;
    }

    get sortDirectionValue(): 'asc' | 'desc' {
        return this.#sortDirection;
    }

    // This is the getter for pagination range
    get paginationRange(): number[] {
        return this.paginationService.getPaginationRange();
    }

    // Method to get the paginated data
    get paginatedData(): TableRow[] {
        return this.paginationService.getPageData(); // Get the data for the current page
    }

    // Hardcoded colCount (assuming 4 columns in your table)
    get colCount(): number {
        return this.DEFAULT_COL_COUNT; // Adjust this based on your table structure
    }

    // Getter for pageSizeValue
    get pageSizeValue(): number {
        return this.pageSize; // Return current page size
    }

    onAction(row: TableRow): void {
        console.log('Action button clicked for:', row);
    }

    // Sorting method
    sortBy(key: string): void {
        if (this.#sortKey === key) {
            this.#sortDirection = this.#sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.#sortKey = key;
            this.#sortDirection = 'asc';
        }

        // Apply sorting based on the current sort key and direction
        this.applySorting();
    }

    private applySorting(): void {
        this.data.sort((a, b) => {
            const valA = a[this.#sortKey];
            const valB = b[this.#sortKey];

            const A = String(valA);
            const B = String(valB);

            return A.localeCompare(B) * (this.#sortDirection === 'asc' ? 1 : -1);
        });

        this.updatePagination();
    }

    private refreshTableData(): void {
        // After changing the page, we need to refresh the paginated data and trigger change detection
        this.cdRef.detectChanges();
    }
}
