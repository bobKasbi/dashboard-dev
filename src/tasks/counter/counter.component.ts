import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-counter',
    template: `
        <h2>Counter: {{ count() }}</h2>
        <button (click)="increase()">+</button>
        <button (click)="decrease()">-</button>
    `,
})
export class CounterComponent {
    public count = signal(0);
    increase() {
        this.count.update((val) => val + 1);
    }
    decrease() {
        this.count.update((val) => val - 1);
    }
}
