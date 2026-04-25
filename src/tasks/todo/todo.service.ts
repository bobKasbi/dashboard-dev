import { Injectable, signal, computed } from '@angular/core';
import { Todo } from './models';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private readonly todos = signal<Todo[]>([
        { id: 1, title: 'Shpping', done: false },
        { id: 2, title: 'Gym', done: true },
    ]);

    public readonly filteredTodos = computed(() => this.todos().filter((t) => t.title.trim() !== ''));

    public readonly doneCount = computed(() => this.todos().filter((t) => t.done).length);

    public addTodo(title: string) {
        const newTodo: Todo = {
            id: crypto.randomUUID() as unknown as number,
            title,
            done: false,
        };

        this.todos.update((list) => [...list, newTodo]);
    }

    public toggleDone(todo: Todo) {
        this.todos.update((list) => list.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)));
    }

    public getTodos() {
        return this.filteredTodos();
    }
}
