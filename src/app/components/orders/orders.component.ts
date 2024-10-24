import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrder, IOrdersProduct } from '../../interfaces/order';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  #OrdersService = inject(OrdersService);
  #ProductsService = inject(ProductsService);
  orders: IOrder[] = [];
  products: IProduct[] = [];
  subscribtions: Subscription[] = [];

  initOrders() {
    this.subscribtions.push(
      this.#ProductsService.getProducts().subscribe((products) => {
        this.products = products;
      }),
      this.#OrdersService.getOrders().subscribe((orders: IOrder[]) => {
        this.orders = orders.slice(0, 10); // To keep it simple;
      })
    );
  }

  getProductById(id: string): IProduct {
    return this.products.find(
      (product) => product.ProductId === id
    ) as IProduct;
  }

  getTotalPrice(products: IOrdersProduct[]): number {
    let totalPriceArray: number[] = [];
    let sum = 0;
    products.forEach((product) => {
      totalPriceArray.push(this.getProductById(product.ProductId).ProductPrice);
    });

    for (let i = 0; i < totalPriceArray.length; i++) {
      sum += totalPriceArray[i];
    }
    return sum;
  }

  ngOnInit(): void {
    this.initOrders();
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((sub) => sub.unsubscribe());
  }
}
