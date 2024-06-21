import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { LocalStorage } from '../constants';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getUserToken()}`,
      },
    });
  }
  return next(req).pipe(
    retry(2),
    catchError((e: HttpErrorResponse) => {
      let errorMessage = ""

      if(e.error instanceof ErrorEvent) {
        // error del cliente
        errorMessage = `Error del navegador ${e.error.message}`;
      }else {
        // error del servidor
        if (e.status === 401) {
          localStorage.removeItem(LocalStorage.token);
          router.navigate(['']);
          errorMessage = `${e.error.error}`;
        } else {
          errorMessage = 'Error desconocido, contacte al administrador';
        }
        
      }  
      return throwError(() => errorMessage);
    })
  );
};
