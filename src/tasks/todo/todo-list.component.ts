import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListViewComponent } from './todo-list-view.component';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [FormsModule, TodoListViewComponent],
    template: `
        <h2>Todo List</h2>

        <input type="text" placeholder="New Todo" [(ngModel)]="newTodo" />

        <button (click)="addTodo()">Add Todo</button>

        <app-todo-list-view [todos]="todos()" (toggle)="toggleDone($event)"></app-todo-list-view>

        <p>Fertig: {{ doneCount() }}</p>
    `,
})
export class TodoListComponent {
    newTodo = '';

    private readonly todoService = inject(TodoService);

    todos = computed(() => this.todoService.filteredTodos());
    doneCount = computed(() => this.todoService.doneCount());

    addTodo() {
        if (this.newTodo.trim() !== '') {
            this.todoService.addTodo(this.newTodo);
            this.newTodo = '';
        }
    }

    toggleDone(todo: any) {
        this.todoService.toggleDone(todo);
    }
}
