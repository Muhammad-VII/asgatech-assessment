import { Component, HostListener, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrder } from '../../interfaces/order';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ProductsService } from '../../services/products/products.service';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  #OrdersService = inject(OrdersService);
  orders: IOrder[] = [];

  loadOrders() {
    this.#OrdersService.getOrders().subscribe((orders: IOrder[]) => {
      this.orders = orders.slice(0, 10) // To keep it simple;
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }
}
