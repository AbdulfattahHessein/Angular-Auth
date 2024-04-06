import { Observable, Observer, map } from 'rxjs';
import { ApiService, IProduct } from './../../services/api.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  apiService = inject(ApiService);

  products$: Observable<IProduct[]>;

  constructor() {
    this.products$ = this.apiService.getAllProducts();
  }
}
