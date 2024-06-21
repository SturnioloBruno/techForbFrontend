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
    return this.http.get(url, {responseType: 'text'}).pipe(
      catchError(error => {
        console.log('Error al obtener la bandera', error);
        throw error;
      })
    ) 
  }

  obtenerImagen(nombrePais: string): Observable<string> {
    const codigoPais = this.obtenerCodigoPais(nombrePais);
    console.log(`el codigo para el pais: ${nombrePais}, es: ${codigoPais}`);
    
    if (codigoPais) {
      return this.obtenerBandera(codigoPais);
    } else {
      return of('https://flagcdn.com/w20/ua.png'); // URL por defecto
    }
  }

  private obtenerCodigoPais(nombrePais: string): string {
    return this.countries[nombrePais];
  }
}
