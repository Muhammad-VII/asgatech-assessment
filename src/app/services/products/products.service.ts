import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IProduct } from '../../interfaces/product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getProducts(limit = 10, page = 1): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      'http://localhost:4200/json_data/products.json'
    );
  }

  getProduct(id: string): Observable<IProduct> {
    return this.httpClient
      .get<IProduct>(`http://localhost:4200/json_data/products.json/`)
      .pipe(filter((product) => product.ProductId === id));
  }
}
