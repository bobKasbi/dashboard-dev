import { inject, Injectable, Injector, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../models/products';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private http = inject(HttpClient);
    private router = inject(Router);
    injector = inject(Injector);

    selectedProduct: Signal<Product | undefined> = signal(undefined);
    private baseUrl = environment.productsUrl;

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.baseUrl}/products`);
    }

    prodDetails(id: string) {
        this.router.navigate(['details', id]);
    }

    getProductDetails(id: string) {
        this.selectedProduct = toSignal(
            this.http.get<Product>(`${this.baseUrl}/products/${id}`),
            {
                injector: this.injector,
            },
        );
    }
}
