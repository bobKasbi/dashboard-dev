import { Component, inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../core/models/products';
import { CartService } from 'src/core/service/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product',
    imports: [MatCardModule, MatButtonModule],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
    product: Product | undefined;

    @Input() id = '';
    public productService = inject(ProductService);
    public selectedProdDetails = this.productService.selectedProduct();
    private cartService = inject(CartService);
    // private snackBar = inject(MatSnackBar);
    private toastr = inject(ToastrService);

    /*
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    duration: MatSnackBarConfig['duration'] = 1000;
    */

    ngOnInit(): void {
        // console.log(this.id);
        this.productService.getProductDetails(this.id);
    }

    addToCart(product: Product | undefined) {
        if (!product) return; // <-- STOP if undefined

        this.cartService.addToCart(product);

        /*this.snackBar.open(`Your product: "${product?.title}" has been added to the cart!`, '', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['snackbar-success'],
        });
        */

        this.toastr.success('Added to cart!');
    }
}
