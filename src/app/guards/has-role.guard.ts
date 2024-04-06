import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const hasRolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const roles: string[] = route.data['roles'];

  const isAuthorized = authService.hasRoles(roles);

  if (!isAuthorized) {
    alert('You are not authorized to access this page');
    return false;
  }
  return true;
};
