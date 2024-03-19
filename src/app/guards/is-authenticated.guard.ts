import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else if (authService.isSessionExpired()) {
    alert('session expired, please login again');
  } else {
    alert('Please login first');
  }
  authService.logout();
  router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
  return false;
};
