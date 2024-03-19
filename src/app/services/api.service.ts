import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/api-constants';
import { LoginResponse } from './auth.service';

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
}
