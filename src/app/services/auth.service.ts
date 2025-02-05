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
  private jwtHelper = new JwtHelperService();

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  get user() {
    if (this.isAuthenticated()) {
      let user = this.jwtHelper.decodeToken<UserModel>(this.currentToken!);

      if (user != null) {
        //roles: "admin"
        user.roles = Array.isArray(user?.roles) ? user.roles : [user?.roles]; // roles: ["admin"]

        return user;
      }
    }
    return null;
  }

  get currentToken() {
    return localStorage.getItem(API.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) {
    this.updateLoggedInStatus(this.isAuthenticated());
  }
  //#region public methods
  isAuthenticated() {
    return !!this.currentToken && this.isTokenValid(this.currentToken);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response) => {
        if (response.success) {
          this.updateLoggedInStatus(true);
          this.saveToken(response.token!);
        }
      })
    );
  }

  logout() {
    this.updateLoggedInStatus(false);
    this.deleteCurrentToken();
  }
  isSessionExpired() {
    return this.currentToken ? this.isTokenExpired(this.currentToken) : false;
  }

  hasRoles(roles: string[]) {
    return roles.some((r) => this.user?.roles.includes(r));
  }
  //#endregion

  //#region private methods
  private updateLoggedInStatus(isLoggedIn: boolean) {
    this._isLoggedIn$.next(isLoggedIn);
  }
  private saveToken(token: string) {
    localStorage.setItem(API.TOKEN_NAME, token);
  }
  private deleteCurrentToken() {
    localStorage.removeItem(API.TOKEN_NAME);
  }
  private isTokenExpired(token: string) {
    return this.jwtHelper.isTokenExpired(token);
  }
  private canDecodeToken(token: string) {
    try {
      this.jwtHelper.decodeToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  private isTokenValid(token: string) {
    return this.canDecodeToken(token) && !this.isTokenExpired(token);
  }
  //#endregion
}
