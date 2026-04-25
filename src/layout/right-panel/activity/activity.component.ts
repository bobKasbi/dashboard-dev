import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-activity',
    imports: [CommonModule],
    template: `
        <div>
            <h4>{{ title() }}</h4>
            <p>Activity widget!</p>
        </div>
    `,
    styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
    public title = input<string>();
}
