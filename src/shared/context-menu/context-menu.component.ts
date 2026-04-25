import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-context-menu',
    standalone: true,
    imports: [FontAwesomeModule],
    template: `
        <fa-icon
            [icon]="faEllipsisVertical"
            class="menu-icon"
            (click)="toggleContext()"
        ></fa-icon>
        @if (open) {
            <!-- 
            <ul class="menu list-group list-group-flush">
                <li class="list-group-item" type="button" (click)="edit()">Edit</li>
                <li class="list-group-item" type="button" (click)="remove()">Delete</li>
            </ul>
        -->
            <div class="menu list-group list-group-flush">
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    (click)="edit()"
                >
                    Edit
                </button>
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    (click)="remove()"
                >
                    Delete
                </button>
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                >
                    Add role
                </button>
            </div>
        }
    `,
    styles: [
        `
            :host {
                position: fixed;
                display: inline-block;
            }

            .menu {
                position: absolute !important;
                top: calc(100% - 20px);
                right: 0;
                transform: translateX(-18%);
                min-width: 140px;
                background: white;
                border: 1px solid #ccc;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                // gap: 1px;
                z-index: 999999;
            }
            .menu-icon {
                cursor: pointer;
                padding: 4px;
                font-size: 18px;
                border: 1px solid green;
            }
            .menu::before {
                content: '';
                position: absolute;
                right: -5px;
                top: 10%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-left: 6px solid #ccc;
            }

            .menu::after {
                content: '';
                position: absolute;
                right: -4px;
                top: 10%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-left: 5px solid white;
            }
        `,
    ],
})
export class ContextMenuComponent {
    private router = inject(Router);

    faEllipsisVertical = faEllipsisVertical;

    user = input<any>();
    open = false;

    private static lastOpen: ContextMenuComponent | null = null;

    toggleContext() {
        if (
            ContextMenuComponent.lastOpen &&
            ContextMenuComponent.lastOpen !== this
        ) {
            ContextMenuComponent.lastOpen.close();
        }

        this.open = !this.open;

        ContextMenuComponent.lastOpen = this.open ? this : null;
    }

    close() {
        this.open = false;
    }

    edit() {
        console.log('EDIT:', this.user().id);
        this.router.navigate(['/profile', this.user().id]);
        this.close();
    }

    remove() {
        console.log('DELETE:', this.user());
        this.close();
    }
}
