import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IOrder } from '../../interfaces/order';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  httpClient = inject(HttpClient);

  getOrders(limit = 10, page = 1): Observable<IOrder[]> {
    return this.httpClient.get<IOrder[]>(
      'http://localhost:4200/json_data/orders.json'
    );
  }

  getOrder(id: string): Observable<IOrder> {
    return this.httpClient
      .get<IOrder[]>(`http://localhost:4200/json_data/orders.json`)
      .pipe(
        map((orders) => orders.slice(0, 10)), // for simplicity, we'll just take the first 10 orders
        map((orders) =>
          orders.filter((order) => order.OrderId.toString() === id)[0]
        )
      );
  }
}
