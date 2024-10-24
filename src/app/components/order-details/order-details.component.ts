import { Component, effect, inject, input } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrder } from '../../interfaces/order';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  #OrdersService = inject(OrdersService);
  id = input.required();

  order: IOrder | undefined;

  constructor() {
    effect(() => {
      this.#OrdersService.getOrders().subscribe((orders) => {
        const slicedOrders = orders.slice(0, 10); // For simpplicity, we're taking only the first 10 orders
        this.order = slicedOrders.filter(
          (order) => order?.OrderId === Number(this.id())
        )[0];
        console.log(this.order);
      });
    });
  }
}
