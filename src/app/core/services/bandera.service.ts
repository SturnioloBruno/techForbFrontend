import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, catchError, map, switchMap } from 'rxjs';
import { ApiEndpoints } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BanderaService {

  private countries: { [key: string]: string } = {};

  constructor(private http: HttpClient) { }

  obtenerImagen(nombrePais: string): Observable<string> {
    return this.http.get(ApiEndpoints.MyProxy.GetBanderaPorNombre(nombrePais), { responseType: 'text' }).pipe(
      map(response => response as string), 
      catchError(error => {
        console.error('Error al obtener la bandera', error);
        return of('https://flagcdn.com/w20/ua.png'); // URL por defecto en caso de error
      })
    );
  }

}
