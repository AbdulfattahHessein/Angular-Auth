import { AuthService } from '../services/auth.service';
import { type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // const authReq = req.clone({
  //   headers: req.headers.set('Authorization', `Bearer ${authService.token}`),
  // });

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authService.token}` },
  });
  console.log(authReq);

  return next(authReq);
};
