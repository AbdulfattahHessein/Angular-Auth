import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      let errorMessage = '';

      if (httpError.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${httpError.error.message}`;
      } else {
        // Server-side error
        errorMessage = `${httpError.message}`;
      }
      // Handle specific error codes or messages
      switch (httpError.status) {
        // case 0:
        //   errorMessage = 'Check your connection';
        //   break;
        case 400:
          // Handle bad request errors
          break;
        case 401:
          // Handle unauthorized errors
          break;
        case 404:
          // Handle not found errors
          break;
        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: httpError.error },
          };
          router.navigateByUrl('/server-error', navigationExtras);
          break;
        default:
          // Handle other errors
          break;
      }

      toastr.error(
        errorMessage,
        `Status code: ${httpError.status.toString()}`,
        {
          timeOut: 100000,
        }
      ); // Notify user with Toastr
      throw httpError;
    })
  );
};
