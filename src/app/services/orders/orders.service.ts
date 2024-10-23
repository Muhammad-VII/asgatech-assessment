import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
