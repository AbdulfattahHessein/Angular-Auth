import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.isTokenExpired()) {
      alert('session expired, please login again');
      router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  } else {
    alert('Please login first');
    router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // return authService.isLoggedIn$.pipe(
  //   tap((isLoggedIn) => {
  //     if (!isLoggedIn) {
  //       alert('Please login first');
  //       router
  //         .navigate(['/Login'], {
  //           queryParams: { returnUrl: state.url },
  //           // onSameUrlNavigation: 'reload',
  //         })
  //         .then((isSuccess) => {
  //           console.log(isSuccess);
  //           if (isSuccess) {
  //             location.reload();
  //           }
  //         });
  //     }
  //   })
  // );
};
