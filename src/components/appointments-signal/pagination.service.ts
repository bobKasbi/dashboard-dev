import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService<T> {
    private data: T[] = [];
    private pageSize = 5;
    private currentPage = 1;

    public setData(data: T[]): void {
        this.data = data;
        this.currentPage = 1;
    }

    public setPageSize(size: number): void {
        this.pageSize = size;
        this.currentPage = 1;
    }

    public goToPage(page: number): void {
        this.currentPage = page;
    }

    public nextPage(): void {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
        }
    }

    public prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }

    public getTotalPages(): number {
        return Math.ceil(this.data.length / this.pageSize);
    }

    public getPageData(): T[] {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.data.slice(start, start + this.pageSize);
    }

    public getPaginationRange(): number[] {
        return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
    }
}
