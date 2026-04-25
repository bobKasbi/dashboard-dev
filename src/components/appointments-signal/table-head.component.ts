// ✅ Reusable TableHeadComponent using signals + columnTemplates for custom headers

import { Component, Input, input, output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from './custom-table.component';

@Component({
    imports: [CommonModule],
    selector: 'thead[app-table-head]',
    template: `
        <tr>
            @for (col of columns(); track col.key) {
                @if (col.key !== 'status') {
                    <th (click)="sort.emit(col.key)">
                        @if (columnTemplates && columnTemplates[col.key]) {
                            <ng-container *ngTemplateOutlet="columnTemplates[col.key]"></ng-container>
                        } @else {
                            <ng-container>
                                {{ col.label }}
                                <span class="sort-icons">
                                    <span [class.active]="sortKey() === col.key && sortDirection() === 'asc'">▲</span>
                                    <span [class.active]="sortKey() === col.key && sortDirection() === 'desc'">▼</span>
                                </span>
                            </ng-container>
                        }
                    </th>
                }
            }

            <th>Aktionen</th>
        </tr>
    `,
    styleUrls: ['./table-head.component.scss'],
})
export class TableHeadComponent {
    readonly columns = input<TableColumn[]>([]);
    readonly sortKey = input<string>('');
    readonly sortDirection = input<'asc' | 'desc'>('asc');
    readonly sort = output<string>();

    @Input() columnTemplates: Record<string, TemplateRef<unknown>> = {};
}
