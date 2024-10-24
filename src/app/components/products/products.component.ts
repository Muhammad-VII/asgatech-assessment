import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/product';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  private destroy$ = new Subject<void>();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });
  }

  buyProduct(id: string): void {
    console.log('Product ID:', id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
