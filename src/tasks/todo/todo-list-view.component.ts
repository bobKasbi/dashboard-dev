import { Component, input, output } from '@angular/core';
import { Todo } from './models';

@Component({
    selector: 'app-todo-list-view',
    standalone: true,
    template: `
        <ul>
            @for (item of todos(); track item.id) {
                <li>
                    <input type="checkbox" [checked]="item.done" (change)="toggle.emit(item)" />
                    {{ item.title }}
                </li>
            }
        </ul>
    `,
})
export class TodoListViewComponent {
    todos = input.required<Todo[]>();
    toggle = output<Todo>();
}
