import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API } from '../constants/api-constants';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  login(username: string, password: string) {
    return new Observable<LoginResponse>((observer) => {
      if (username === 'user' && password === '123') {
        console.log('login success');

        observer.next({
          token: API.FIXED_TOKEN,
          success: true,
          message: 'login success',
        });
      } else {
        observer.next({
          token: null,
          success: false,
          message: 'username or password is wrong',
        });
      }
    });
  }
  getAllProducts() {
    return new Observable<getAllProductsResponse>((observer) => {
      //emit list of products
      observer.next({
        success: true,
        message: 'success',
        date: [
          { name: 'Product 1', price: 100 },
          { name: 'Product 2', price: 200 },
          { name: 'Product 3', price: 300 },
        ],
      });
    }).pipe(map((response) => response.date));
  }
}

export interface getAllProductsResponse {
  success: boolean;
  message: string;
  date: IProduct[];
}

export interface IProduct {
  name: string;
  price: number;
}
