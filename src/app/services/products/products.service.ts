import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { find, Observable, share, shareReplay, take } from 'rxjs';
import { IProduct } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      'http://localhost:4200/json_data/products.json'
    )
  }
}
