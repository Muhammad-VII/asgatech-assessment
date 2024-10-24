import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrder, IOrdersProduct } from '../../interfaces/order';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  products: IProduct[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initOrders();
  }

  initOrders(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products: IProduct[]) => {
        this.products = products;
      });

    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe((orders: IOrder[]) => {
        this.orders = orders.slice(0, 10); // For simplicity, limit to 10 orders
      });
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find((product) => product.ProductId === id);
  }

  getTotalPrice(products: IOrdersProduct[]): number {
    return products.reduce((sum, product) => {
      const foundProduct = this.getProductById(product.ProductId);
      return foundProduct ? sum + foundProduct.ProductPrice : sum;
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
