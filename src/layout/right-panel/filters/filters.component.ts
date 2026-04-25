import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-filters',
    imports: [CommonModule],
    template: `
        <div>
            <h4>{{ title() }}</h4>
            <p>Filters widget!</p>
        </div>
    `,
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
    public title = input<string>();
}
