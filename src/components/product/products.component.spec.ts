import { ComponentFixture, TestBed } from '@angular/core/testing';

import {} from './product.component';
import { ProductComponent } from './product.component';
import { ProductService } from 'src/core/service/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

describe('ProductDetailsComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductComponent, ToastrModule.forRoot()],
            providers: [ProductService, provideRouter([]), provideHttpClient(), provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
