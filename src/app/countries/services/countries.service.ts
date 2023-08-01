import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }

  searchContryByAlphaCode(alphaCode: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map( countries => countries[0]  ),
      catchError( error => of() )
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${capital}`).pipe(
      catchError( error => {
        return of([]);  // retornamos observable vacío
      } )
    );
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${country}`).pipe(
      catchError( error => {
        return of([]);  // retornamos observable vacío
      })
    );
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`).pipe(
      catchError( error => {
        return of([]);  // retornamos observable vacío
      })
    )
  }

}
