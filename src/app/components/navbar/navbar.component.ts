import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { reloadEntireApp } from '../../helpers/reload-entire-app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = false;
  constructor() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  logout() {
    this.authService.logout();
    this.router
      .navigate(['/Login'], {
        queryParams: { returnUrl: this.router.routerState.snapshot.url },
      })
      .then(reloadEntireApp);
  }
}
