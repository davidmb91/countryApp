import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( error => of([]) ),
        delay(2000)
      )
  }

  searchContryByAlphaCode(alphaCode: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map( countries => countries[0]  ),
      catchError( error => of() )
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`);
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${country}`);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`);
  }

}
