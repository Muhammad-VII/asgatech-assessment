import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { find, map, Observable, share, shareReplay, take } from 'rxjs';
import { IProduct } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      'http://localhost:4200/json_data/products.json'
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.httpClient
      .get<IProduct[]>('http://localhost:4200/json_data/products.json')
      .pipe(
        map(
          (products) => products.filter((p) => p.ProductId.toString() === id)[0]
        )
      );
  }
}
