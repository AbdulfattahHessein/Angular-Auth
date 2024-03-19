import { isAuthenticatedGuard } from './../guards/is-authenticated.guard';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { API } from '../constants/api-constants';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.token);

  user: UserModel | null = this.token ? this.getUser(this.token) : null;
  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }
  get token() {
    return localStorage.getItem(API.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {}

  isAuthenticated() {
    return !!this.token;
  }
  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response) => {
        if (response.success) {
          this._isLoggedIn$.next(true);

          localStorage.setItem(API.TOKEN_NAME, response.token!);

          this.user = this.getUser(response.token!);
        }
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem(API.TOKEN_NAME);
  }
  private getUser(token: string): UserModel {
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }
  hasRoles(roles: string[]) {
    return roles.some((r) => this.user?.roles.includes(r));
  }
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string | null;
}
