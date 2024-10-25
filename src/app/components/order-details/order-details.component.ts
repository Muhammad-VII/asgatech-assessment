import { Component, computed, inject, input, Signal } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { IOrder, IOrdersProduct } from '../../interfaces/order';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import {
  combineLatest,
  forkJoin,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/product';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/user';
@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, AsyncPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  #OrdersService = inject(OrdersService);
  #ProductsService = inject(ProductsService);
  #UsersService = inject(UsersService);

  id = input.required<string>();

  details$: Signal<
    Observable<{ order: IOrder; products: IProduct[]; user: IUser }>
  > = computed(() => {
    // Cache the order Observable to avoid multiple calls for the same ID
    const order$ = this.#OrdersService.getOrder(this.id()).pipe(
      shareReplay(1) // Shares the result with all subscribers and replays the last value
    );

    const user$ = order$.pipe(
      switchMap((order) => this.#UsersService.getUser(order.UserId))
    );

    const products$ = order$.pipe(
      switchMap((order) => {
        const { Products } = order;
        if (!Products || Products.length === 0) {
          return of([]); // Return an empty array if there are no products
        }

        // Fetch products based on order's product IDs and cache the results
        return combineLatest(
          Products.map((p) => {
            return this.#ProductsService
              .getProduct(p.ProductId.toString())
              .pipe(
                map((product) => ({ ...product, quantity: p.Quantity })),
              );
          })
        );
      })
    );

    // Combine the cached Observables to reduce HTTP calls
    return combineLatest([order$, products$, user$]).pipe(
      map(([order, products, user]) => ({ order, products, user }))
    );
  });
}
