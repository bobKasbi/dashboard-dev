import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isLoggedIn = false;

    public login(): void {
        this.isLoggedIn = true;
    }

    public logout(): void {
        this.isLoggedIn = false;
    }

    public get isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}
