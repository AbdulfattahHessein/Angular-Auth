import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { API } from '../constants/api-constants';
import { UserModel } from '../models/user-model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private jwtHelper = new JwtHelperService();

  user: UserModel | null = null;
  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }
  get token() {
    return localStorage.getItem(API.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {
    // console.log('try decode', this.decodeToken(this.token!));

    this.user = this.decodeToken(this.token!);

    this._isLoggedIn$.next(this.isAuthenticated());
  }

  isAuthenticated() {
    return !!this.token && !!this.decodeToken(this.token);
  }
  isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response) => {
        if (response.success) {
          this._isLoggedIn$.next(true);
          localStorage.setItem(API.TOKEN_NAME, response.token!);
          this.user = this.decodeToken(response.token!);
        }
      })
    );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem(API.TOKEN_NAME);
  }
  private decodeToken<T>(token: string): T | null {
    try {
      return token ? this.jwtHelper.decodeToken<T>(token) : null;
    } catch (error) {
      console.error('Current token is not valid');
      this.logout();
      return null;
    }
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
