import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ApiResponse, AuthenticationResponse, ExceptionResponse, LoginPayload, RegisterPayload, User } from '../model/common.model';
import { ApiEndpoints, LocalStorage } from '../constants';
import { catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal<boolean>(false);

  router: Router = inject(Router);

  constructor(private _http: HttpClient) {
    // todo revisar que el token sea valido? y ponerlo todo en un tokenService 
    if (this.getUserToken()) {
      this.isLoggedIn.update(() => true);
    }
  }

  register(payload: RegisterPayload){
    return this._http.post<AuthenticationResponse>(`${ApiEndpoints.Auth.Register}`, payload);
  }

  login(payload: LoginPayload) {
    return this._http
    .post<AuthenticationResponse>(`${ApiEndpoints.Auth.Login}`, payload)
    .pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem(LocalStorage.token, response.token);
          this.isLoggedIn.update(() => true);
        }
        return response;
      })
    );
  }
  
  me() {
    const token = this.getUserToken();
    if (token) {
      return this._http.get<User>(`${ApiEndpoints.User.Me}`);
    } else {
      return throwError(() => new Error('No token found'));
    }
  }
  

  getUserToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(LocalStorage.token);
    }
    return null;
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(LocalStorage.token);
    }
    this.isLoggedIn.update(() => false);
    this.router.navigate(['login']);
  }
}
