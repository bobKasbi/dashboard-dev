import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { ProductService } from 'src/core/service/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ShopComponent', () => {
    let component: ShopComponent;
    let fixture: ComponentFixture<ShopComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShopComponent],
            providers: [ProductService, provideHttpClient(), provideRouter([]), provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(ShopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
