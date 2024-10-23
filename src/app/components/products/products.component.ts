import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { IProduct } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  #ProductsService = inject(ProductsService);
  products: IProduct[] = [];

  ngOnInit(): void {
    this.#ProductsService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  buyProduct(id: string) {
    console.log(id);
  }
}
