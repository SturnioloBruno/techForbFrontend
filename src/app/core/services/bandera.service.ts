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

  cargarPaisesYCodigo(): Observable<{ [key: string]: string }> {
    const url = `${ApiEndpoints.MyProxy.GetCodes}`;
    return this.http.get<{ [key: string]: string }>(url).pipe(
      map(data => {
        this.countries = data;
        return this.countries;
      }),
      catchError(error => {
        console.error('Error al cargar los países:', error);
        throw error;
      })
    );
  }

  obtenerBandera(codigoPais: string): Observable<string> {
    const url = `${ApiEndpoints.MyProxy.GetBandera(codigoPais)}`;
    return of(url); // Regresa la URL directamente en lugar de hacer una solicitud HTTP
  }

  obtenerImagen(nombrePais: string): Observable<string> {
    const codigoPais = this.obtenerCodigoPais(nombrePais);
    if (codigoPais) {
      return this.obtenerBandera(codigoPais);
    } else {
      return of(''); // O alguna URL por defecto o un mensaje de error
    }
  }

  private obtenerCodigoPais(nombrePais: string): string {
    return this.countries[nombrePais];
  }
}
