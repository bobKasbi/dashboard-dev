import { Component } from '@angular/core';
import { TableColumn, CustomTableComponent } from './custom-table.component';

@Component({
    selector: 'app-custom-table-page',
    template: `
        <app-custom-table [data]="data" [columns]="columns"></app-custom-table>
    `,
    imports: [CustomTableComponent],
})
export class CustomTablePageComponent {
    public data = [
        { id: 1, date: new Date(2025, 4, 1), time: '09:00 Uhr', therapist: 'Brigitte Althaus', status: 'confirmed' },
        { id: 2, date: new Date(2025, 4, 2), time: '10:30 Uhr', therapist: 'Dr. Felix Berger', status: 'pending' },
        { id: 3, date: new Date(2025, 4, 3), time: '14:15 Uhr', therapist: 'Laura Meier', status: 'confirmed' },
        { id: 4, date: new Date(2025, 4, 4), time: '11:45 Uhr', therapist: 'Tobias Winkler', status: 'canceled' },
        { id: 5, date: new Date(2025, 4, 5), time: '16:00 Uhr', therapist: 'Brigitte Althaus', status: 'confirmed' },
        { id: 6, date: new Date(2025, 4, 6), time: '08:30 Uhr', therapist: 'Laura Meier', status: 'pending' },
    ];

    public columns: TableColumn[] = [
        { label: 'Datum', key: 'date' },
        { label: 'Uhrzeit', key: 'time' },
        { label: 'Therapeut', key: 'therapist' },
        { label: 'Status', key: 'status' },
    ];
}
