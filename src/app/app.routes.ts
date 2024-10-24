import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    data: { animation: 'ProductsPage' },
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders.component').then(
        (c) => c.OrdersComponent
      ),
    data: { animation: 'OrdersPage' },
  },
  {
    path: 'order-details/:id',
    loadComponent: () =>
      import('./components/order-details/order-details.component').then(
        (c) => c.OrderDetailsComponent
      ),
  },
  { path: '**', redirectTo: 'products' },
];
